import fs from 'fs';

/**
 * Read a file from the specified path and return
 * its contents as a string
 * 
 * @param path File path
 */
export function readFileText(path: string) : string {
	return fs.readFileSync(path, 'utf8');
}

/**
 * Read a file from the specified path and return
 * its contents as a JSON decoded object
 * 
 * @param path File path
 */
export function readFileJson(path: string) : any {
	return JSON.parse(readFileText(path));
}