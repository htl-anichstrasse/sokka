import { Router } from "express";
import * as log4js from 'log4js';

export default class Route {
    readonly router: Router
    readonly path: string
    logger: log4js.Logger;

    /**
     * This function is called when the route is first registered to the express router. Do
     * anything that requires the app to be fully initialized here.
     */
    initialize() {
        this.logger = log4js.getLogger(this.constructor.name);
        for (let routerStack of this.router.stack) {
            for (let method of Object.keys(routerStack.route.methods)) {
                this.logger.info(`Registered ${method.toUpperCase()} '${(this.path + routerStack.route.path).replace('//', '/')}'`);
            }
        }
    }
}