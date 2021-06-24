import { User } from "../../../models/user";

/**
 * Fetch a profile either by username or email
 * 
 * @param identity The identity
 * @returns The user, or undefined
 */
export function fetchProfileByIdentity(identity: string): Promise<User|undefined> {
	const filter = [
		{ email: identity },
		{ username: identity }
	];

	// Find the user profile
	return User.findOne({where: filter});
}

/**
 * Fetch a profile by their email address
 * 
 * @param email The email address
 * @returns The user, or undefined
 */
export function fetchProfileByEmail(email: string): Promise<User|undefined> {
	return User.findOne({where: { email }});
}

/**
 * Fetch a profile by their username
 * 
 * @param username The username
 * @returns The user, or undefined
 */
export function fetchProfileByUsername(username: string): Promise<User|undefined> {
	return User.findOne({where: { username }});
}

/**
 * Generate a username from a given email address
 * 
 * @param email The email address
 * @returns The username
 */
export function generateUsername(email: string): string {
	return email.replace(/([^@]*).*/, '$1').replace(/\./g, '_');
}