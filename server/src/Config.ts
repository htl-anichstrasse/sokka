import fs = require('fs')
import * as log4js from 'log4js';

var callbacks = [];
var ready = false;
const environmentReady = (callback) => {
    if (ready) {
        callback();
    }
    callbacks.push(callback);
}
const setEnvironmentReady = () => {
    ready = true;
    for (let i = 0; i < callbacks.length; i++) {
        callbacks[i]();
    }
}

/**
 * Only use this object to retrieve config values. It will first try to retrieve it from ENV vars and then from Docker Secrets
 */
const config = {
    logger: log4js.getLogger('Config'),

    readConfigValue: (key): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            environmentReady(() => {
                if (process.env.hasOwnProperty(key)) {
                    resolve(process.env[key]);
                    return;
                }
                fs.readFile(`/run/secrets/${key}`, 'utf-8', (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        });
    }
}

export default config;
export { setEnvironmentReady };
