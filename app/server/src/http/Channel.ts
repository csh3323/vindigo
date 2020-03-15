import WebSocket, { Server } from 'ws';
import { UserProfile } from 'auth/User';

export class Channel {

	public readonly user: UserProfile;

	private ws: WebSocket;


	public constructor(ws: WebSocket, user: UserProfile) {
		this.user = user;
		this.ws = ws;
	}

}