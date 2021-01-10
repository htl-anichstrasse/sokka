import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetGroupsRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPGetGroupsRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getgroups', this.get);
        this.fullpath = '/acp/getgroups';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let groups = await Group.getAll();
            res.send({ success: true, groups });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching groups' });
        }
    }
}

export default new ACPGetGroupsRoute();
