/**
 * Config used to configure the Telescope setup
 */
export interface Config {
	debug: boolean,
	installName: string
	logFile: string
	web: {
		hostname: string
		port: number
	}
	database: {
		driver: string
		hostname?: string
		username?: string
		password?: string
		prefix?: string
		name?: string
		port?: number
	}
}