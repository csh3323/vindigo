import { Session } from "../models/session";
import { User } from "../models/user";
import { database } from "..";

/**
 * Define all database models
 */
export function registerModels() {
	database.defineModel(Session);
	database.defineModel(User);
}