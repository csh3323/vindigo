import { http } from "..";
import { CoreSchema } from "../schemas/core/schema";
import { UserSchema } from "../schemas/users/schema";

/**
 * Define all database models
 */
export function registerSchemas() {
	http.defineProvider(new CoreSchema());
	http.defineProvider(new UserSchema());
}