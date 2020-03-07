import fs from 'fs';

export function readFileText(path: string) : string {
	return fs.readFileSync(path, 'utf8');
}

export function readFileJson(path: string) : any {
	return JSON.parse(readFileText(path));
}