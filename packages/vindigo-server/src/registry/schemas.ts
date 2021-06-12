import { http } from "..";

import { UserSchema } from "../schemas/users/schema";

/**
 * Define all database models
 */
export function registerSchemas() {
	http.defineProvider(new UserSchema());
}