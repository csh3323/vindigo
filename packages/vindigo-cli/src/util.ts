import { join } from 'path';

export const ENTRYPOINT = join(__dirname, '../../vindigo-server/dist/index.js');
export const SCRIPT_NAME = 'Vindigo Server';

export function bytesToSize(bytes: number) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) + '');
	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}