import { ValidatorResult } from "jsonschema";

/**
 * The result of a schema validation operated on an object.
 * 
 * When the validation was successful, isValid will be set to true.
 * If the validation failed, isValid will be set to false, and the
 * reasons array will be filled with the cause(s) of the failure.
 */
export class SchemaValidation {
	
	/** Whether the validation was successful */
	public readonly isValid: boolean;

	/** List of reasons why the validation may have failed */
	public readonly reasons: string[];

	public constructor(result: ValidatorResult) {
		this.isValid = result.valid;
		this.reasons = result.errors.map(e => e.stack);
	}

}