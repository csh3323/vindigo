import { VindigoServer } from "./server";
import ON_DEATH from 'death';
import consola from "consola";

const vindigo = new VindigoServer();

export { vindigo };

try {
	vindigo.start();

	ON_DEATH(() => {
		vindigo.stop();
	});
} catch(err) {
	consola.error(err);
	process.exit(1);
}
