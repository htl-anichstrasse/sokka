import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetConfigRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPGetConfigRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getconfig', this.get);
        this.fullpath = '/acp/getconfig';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let configEntry = await ACPConfigValue.getAll();
            res.send({ success: true, data: configEntry });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching config entries' });
            this.logger.error(`An unknown error occured while fetching config entries: ${err}`);
        }
    }
}

export default new ACPGetConfigRoute();
