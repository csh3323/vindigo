import { Client, Sink, createClient } from 'graphql-ws';
import { DocumentNode, print } from "graphql";

import { Dictionary } from "vue-router/types/router";
import { store } from ".";

type Headers = Dictionary<string>;

/**
 * The service in charge of connecting to the server
 */
export class APIService {

	// private logger = logger('API');
	private endpoint = '/graphql';
	private client?: Client;

	public constructor() {
		this.connect();
	}

	/**
	 * Returns whether the client is connected
	 */
	public get isConnected(): boolean {
		return !!this.client;
	}

	/**
	 * Insert the authentication token into the
	 * specified header dictionary.
	 * 
	 * @param headers The headers dictionary
	 */
	private insertToken(headers: Headers) {
		if(store.instance.state.authToken) {
			headers['Authorization'] = 'Bearer ' + store.instance.state.authToken;
		}
	}

	/**
	 * Executes the given query and returns the result
	 *
	 * @param query The query to execute
	 * @param variables The query variables
	 * @param config Further query configuration
	 * @returns Result
	 */
	public async query(query: DocumentNode, variables?: any, config?: QueryConfig) : Promise<any> {
		const endpoint = config?.endpoint ?? this.endpoint;
		const headers: Headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		};

		this.insertToken(headers);

		const response = await fetch(endpoint, {
			signal: config?.abort?.signal,
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				query: print(query),
				variables: variables || {}
			})
		}).then(res => res.json());

		if(response.error || response.errors) {
			throw new Error('API Query failure: ' + (response.error || JSON.stringify(response.errors)));
		} else {
			return response.data || {};
		}
	}

	/**
	 * Executes the given query and listens to the responses.
	 *
	 * @param query The query to execute
	 * @param variables The query variables
	 * @returns Subscription disposer
	 */
	public subscribe(query: DocumentNode, observer: Sink<any>, variables?: any) : () => void {
		if(!this.client) {
			throw new Error('Connection not established');
		}

		return this.client.subscribe({
			query: print(query),
			variables: variables
		}, {
			...observer,
			next(res: any) {
				if(res.error || res.errors) {
					const err = new Error('Query failed: ' + (res.error || JSON.stringify(res.errors)));
		
					if(observer.error) {
						observer.error?.(err);
					} else {
						throw err;
					}
				} else {
					observer.next?.(res.data);
				}
			}
		});
	}

	/**
	 * Connect to the API and open a socket
	 * for listening to subscriptions.
	 */
	public connect() {
		this.close();
		this.client = createClient({
			url: '/subscription',
			connectionParams: () => {
				const params: Headers = {};
				
				this.insertToken(params);

				return params;
			}
		});
	}

	/**
	 * Close the API connection
	 */
	public close() {
		this.client?.dispose();
		this.client = undefined;
	}

}

/**
 * The config that may be passed to an API query
 */
export interface QueryConfig {
	endpoint?: string;
	abort?: AbortController
}