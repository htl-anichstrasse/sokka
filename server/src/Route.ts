import { Router } from "express";
import * as log4js from 'log4js';

export default class Route {
    readonly router: Router
    readonly path: string
    readonly fullpath: string
    logger: log4js.Logger;

    initialize() {
        this.logger = log4js.getLogger(this.constructor.name);
        this.logger.info(`Registered for path '${this.fullpath}'`);
    }
}