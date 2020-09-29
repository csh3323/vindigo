import { ErrorWriter } from './bootstrap/ErrorWriter';
import {TeleboardClient} from './bootstrap/TeleboardClient';

// Instantiate the Teleboard Client and
// propagate all caught exceptions to the
// exception writer.
try {
    const client = new TeleboardClient();

    client.launch();
} catch(err) {
    new ErrorWriter(err).write();
}