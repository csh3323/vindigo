/**
 * A property reference within the config. Supports a default value
 * which is used when the config option is omitted.
 */
export class ConfigProperty {

	public name: string;
	public fallback: string|undefined;

	public constructor(name: string, fallback?: string) {
		this.fallback = fallback;
		this.name = name;
	}

}

/**
 * Pull a single property from the server config. Properties are
 * loaded by dotenv, which parse all properties from the `.env`
 * file located in the root directory.
 * 
 * Config properties are defined by instantiating instances of
 * ConfigProperty which can be passed to this function.
 * 
 * @param property The property
 * @returns The value, fallback value, or undefined
 */
export function config(property: ConfigProperty): string|undefined {
	return process.env[property.name] || property.fallback;
}