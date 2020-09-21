import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server } from 'http';
import * as log4js from 'log4js';
import Database from './Database';
import * as routes from './routes';

class App {
    public express: express.Application;
    public server: Server;
    public database: Database;
    private logger: log4js.Logger;

    constructor() {
        this.express = express();
        this.logger = log4js.getLogger('App');

        // Load middleware
        this.express.use(log4js.connectLogger(this.logger, {
            level: 'auto', statusRules: [
                { from: 200, to: 499, level: 'debug' },
                { from: 500, to: 599, level: 'error' }
            ]
        }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

        // Register all routers
        this.registerRouters();

        // Register default router
        this.express.use((req, res) => {
            res.status(404).end();
        });

        // Initialize database
        Database.create().then(() => {
            this.logger.info('Sokka ready to rumble!');
        });
    }

    private registerRouters(): void {
        for (let route of Object.values(routes)) {
            this.express.use(route.path, route.router);
            this.logger.info(`Registered route '${route.constructor.name}' for path '${route.path}'`);
        }
    }
}

export default App;
