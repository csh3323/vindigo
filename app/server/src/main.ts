import {TeleboardServer} from './bootstrap/TeleboardServer';
import ON_DEATH from 'death';

(function() {
	const teleboard = new TeleboardServer();

	// Launch all related teleboard services and start
	// processing the main teleboard event loop.
	teleboard.launch();

	ON_DEATH(() => {
		teleboard.terminate();
	});
})();