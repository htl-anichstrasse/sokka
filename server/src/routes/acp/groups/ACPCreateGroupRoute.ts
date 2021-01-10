import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPCreateGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPCreateGroupRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/creategroup', this.post);
        this.fullpath = '/acp/creategroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.groupname || !req.body.rebate) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let group = await Group.create(req.body.groupname, req.body.rebate);
            res.send({ success: true, message: `Successfully created group with id '${group.id}'` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while creating group' });
            this.logger.error(`An unknown error occured while creating group with name '${req.body.groupname}': ${err}`);
        }
    }
}

export default new ACPCreateGroupRoute();
