import WebSocket, { Server } from 'ws';
import { UserProfileLegacy } from '../auth/UserProfileLegacy';

export class Channel {

	public readonly user: UserProfileLegacy;

	private ws: WebSocket;


	public constructor(ws: WebSocket, user: UserProfileLegacy) {
		this.user = user;
		this.ws = ws;
	}

}