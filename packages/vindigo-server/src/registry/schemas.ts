import { http, logger } from "..";

import { CoreSchema } from "../schemas/core/schema";
import { ProjectsSchema } from "../schemas/projects/schema";
import { TeamsSchema } from "../schemas/teams/schema";

/**
 * Define all database models
 */
export function registerSchemas() {
	logger.info(`Loading API schemas`);

	http.defineProvider(new CoreSchema());
	http.defineProvider(new ProjectsSchema());
	http.defineProvider(new TeamsSchema());
}