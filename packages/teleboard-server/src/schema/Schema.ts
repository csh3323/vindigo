import { Validator } from 'jsonschema';
import { SchemaBlueprint } from './Blueprint';
import { SchemaValidation } from './Validation';

type SchemaOrBuilder = object|((bp: SchemaBlueprint) => object);

/**
 * Represents a schema describing a JSON structure
 * with support for validation, subschemas, and an
 * easy to use builder pattern.
 */
export class Schema {

	public readonly identifier: string;
	public readonly schema: object;

	private references: Schema[];
	private validator: Validator;

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
	 * Returns a list of all Schemas this Schema depends
	 * on for validation.
	 * 
	 * @returns Schema list
	 */
	public getDependencies() : Schema[] {
		return [...this.references];
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
	 * @returns The validation result
	 */
	public validate(json: object|string) : SchemaValidation {
		const structure = (typeof json == 'object') ? json : JSON.parse(json);

		return new SchemaValidation(
			this.validator.validate(structure, this.schema)
		);
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