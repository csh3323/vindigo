/**
 * Returns true when the given string is a hex color code
 * 
 * @param value The string to test
 * @returns Result boolean
 */
export function isHexColor(value: string) : boolean {
	return /^#([0-9A-F]{3}|[0-9A-F]{6})$/mi.test(value);
}