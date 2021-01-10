import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPGetUsersRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPGetUsersRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getusers', this.get);
        this.fullpath = '/acp/getusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let users = await User.getAll();
            res.send({ success: true, users });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching ACP users' });
            this.logger.error(`An unknown error occured while fetching ACP users: ${err}`);
        }
    }
}

export default new ACPGetUsersRoute();
