import {TelescopeServer} from './bootstrap/TelescopeServer';
import ON_DEATH from 'death';

(function() {
	const telescope = new TelescopeServer();

	// Launch all related telescope services and start
	// processing the main telescope event loop.
	telescope.launch();

	ON_DEATH(() => {
		telescope.terminate();
	});
})();