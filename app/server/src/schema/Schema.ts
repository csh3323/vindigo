import { Validator } from 'jsonschema';

type SchemaOrBuilder = object|((bp: SchemaBlueprint) => object);

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

/**
 * Represents a schema describing a JSON structure
 * with support for validation, subschemas, and an
 * easy to use builder pattern.
 */
export class Schema {

	public readonly identifier: string;

	private references: Schema[];
	private validator: Validator;
	private schema: object;

	private constructor(id: string, schema: object) {
		this.references = [];
		this.validator = new Validator();
		this.identifier = id;
		this.schema = {
			...schema,
			id: '/' + id
		};
	}

	/**
	 * Add a reference to the given schema, which allows
	 * for further delegation of schema validation.
	 * 
	 * @param schema The schema
	 */
	public addReference(schema: Schema) {
		this.references.push(schema);
		this.validator.addSchema(schema.schema);
		schema.references.forEach(dep => {
			this.addReference(dep);
		});
	}

	/**
	 * Validate the given JSON structure against this
	 * schema and returns the result.
	 * 
	 * @param json Json structure
	 */
	public validate(json: object|string) {
		const result = this.validator.validate(json, this.schema);

		console.log(result);
	}

	/**
	 * Create a new schema with the given name and blueprint.
	 * 
	 * The builder function is expected to return a Schema
	 * specification, optionally using the provided blueprint
	 * in order to describe complex relations and rules.
	 * 
	 * @param name Schema name
	 * @param schema Contents
	 * @returns New Schema
	 */
	public static of(name: string, content: SchemaOrBuilder) : Schema {
		const blueprint = new SchemaBlueprint();
		const schema = (typeof content == 'function') ? content(blueprint) : content;
		const instance = new Schema(name, schema);
		blueprint.applyTo(instance);
		return instance;
	}

}

const $person = Schema.of("Person", () => ({
	type: 'object',
	properties: {
		name: {
			type: 'string'
		}
	},
	required: ['name']
}));
