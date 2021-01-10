import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetACPUsersRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPGetACPUsersRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getacpusers', this.get);
        this.fullpath = '/acp/getacpusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let users = await ACPUser.getAll();
            res.send({ success: true, users });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching users' });
            this.logger.error(`An unknown error occurred while fetching users: ${err}`);
        }
    }
}

export default new ACPGetACPUsersRoute();
