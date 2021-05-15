import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import consola from 'consola';

export function handleConfig() {
    const productionConfig = join(__dirname, '../../../../data/config.json');
	const defaultConfig = join(__dirname, '../../../../data/config.default.json');

	if(existsSync(productionConfig)) {
		console.log(readFileSync(productionConfig, 'utf8'));
	} else if(existsSync(defaultConfig)) {
		console.log(readFileSync(defaultConfig, 'utf8'));
	} else {
        consola.error('Failed to locate config file');
    }
}