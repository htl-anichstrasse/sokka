import { Router } from "express";
import * as log4js from 'log4js';

export default class Route {
    readonly router: Router
    readonly path: string
    readonly fullpath: string
    logger: log4js.Logger;

    /**
     * This function is called when the route is first registered to the express router. Do
     * anything that requires the app to be fully initialized here.
     */
    initialize() {
        this.logger = log4js.getLogger(this.constructor.name);
        this.logger.info(`Registered for path '${this.fullpath}'`);
    }
}