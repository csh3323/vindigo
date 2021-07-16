import { CoreSchema } from "../schemas/core/schema";
import { ProjectsSchema } from "../schemas/projects/schema";
import { TeamsSchema } from "../schemas/teams/schema";
import { http } from "..";

/**
 * Define all database models
 */
export function registerSchemas() {
	http.defineProvider(new CoreSchema());
	http.defineProvider(new ProjectsSchema());
	http.defineProvider(new TeamsSchema());
}