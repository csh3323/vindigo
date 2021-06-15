import { CoreSchema } from "../schemas/core/schema";
import { http } from "..";

/**
 * Define all database models
 */
export function registerSchemas() {
	http.defineProvider(new CoreSchema());
}