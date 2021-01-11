import { Request, Response, Router } from 'express';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetConfigRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getconfig', this.get.bind(this));
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
