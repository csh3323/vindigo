import { Model } from "objection";

/**
 * The base model which all database models extend
 * their structure from.
 */
export abstract class BaseModel extends Model {

	[key: string]: any;

}