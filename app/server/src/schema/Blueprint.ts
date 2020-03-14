import { Schema } from "./Schema";

/**
 * Provides utilities for building up a Schema
 * and describing its contents, relations,
 * and rules.
 */
export class SchemaBlueprint {

	/** List of sub schema references */
	private references: Schema[] = [];

	/**
	 * Insert a reference to another Schema instance
	 * 
	 * @param schema The other schema
	 */
	public reference(schema: Schema): object {
		this.references.push(schema);

		return {
			$ref: '/' + schema.identifier
		}
	}

	/**
	 * Apply the configuration within this blueprint
	 * to the given schema instance
	 * 
	 * @param schema The schema
	 */
	public applyTo(schema: Schema) {
		this.references.forEach(sub => {
			schema.addReference(sub);
		});
	}

}