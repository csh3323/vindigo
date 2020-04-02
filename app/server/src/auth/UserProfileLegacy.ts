/**
 * A class representing a single user account on
 * this Telescope instance. Each user contains
 * a snapshot of information 
 */
export class UserProfileLegacy {

	/** The users permissions */
	public readonly permissions: string[];

	/** The creation timestamp */
	public readonly timestamp: number;

	public readonly username: string;
	public readonly email: string;
	public readonly uid: string;

	public constructor(uid: string) {
		this.uid = uid;
		this.permissions = [];
		this.timestamp = 0;
		this.username = "";
		this.email = "";
	}

	public static getFromJWT() : Promise<UserProfileLegacy> {
		return Promise.resolve(new UserProfileLegacy("todo"));
	}

}