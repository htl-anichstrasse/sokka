import * as dotenv from 'dotenv';
import * as http from 'http';
import * as log4js from 'log4js';
import App from './App';
import config, { setEnvironmentReady } from './Config';

function validatePort(port: number | string): boolean {
    let convPort = (typeof port === 'string') ? parseInt(port, 10) : port;
    if (isNaN(convPort)) {
        return false;
    } else if (port < 2 || port >= 65535) {
        return false;
    }
    return true;
}

function onListening() {
    const address = server.address();
    logger.info(`Now listening on ${(typeof address === 'string') ? address : ':' + address.port}`);
}

// Configure environ and logger
dotenv.config();
setEnvironmentReady();
log4js.configure({
    appenders: {
        console: { type: 'console' }
    },
    categories: {
        default: { appenders: ['console'], level: config.readConfigValueSync('DEBUG') === 'true' ? 'debug' : 'info' }
    }
});
const logger = log4js.getLogger('Bootstrap');

// Validate and set port from environ
var port = 3000;
var configPort = config.readConfigValueSync('PORT');
if (validatePort(configPort || 3000)) {
    port = configPort ? parseInt(configPort) : 3000;
} else {
    logger.warn('Invalid port, using port 3000');
}

// Start listening
logger.info('Booting server...');
const app = new App();
app.express.set('port', port);
const server = http.createServer(app.express);
server.on('listening', onListening);
server.listen(port);
app.server = server;
