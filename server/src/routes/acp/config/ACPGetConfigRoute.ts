import { Request, Response, Router } from 'express';
import ConfigEntry from '../../../models/ConfigEntry';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetConfigRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getconfig', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let configEntries = await ConfigEntry.getAll();
            res.send({ success: true, data: configEntries });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching config entries' });
            this.logger.error(`An unknown error occured while fetching config entries: ${err}`);
        }
    }
}

export default new ACPGetConfigRoute();
