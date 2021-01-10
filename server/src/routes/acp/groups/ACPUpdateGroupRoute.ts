import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPUpdateGroupRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updategroup', this.post);
        this.fullpath = '/acp/updategroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ group_id: 'number', groupname: 'string', rebate: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        let group;
        try {
            group = await Group.getById(req.body.group_id);
        } catch {
            res.status(400);
            res.send({ success: false, message: `Could not find group with id '${req.body.group_id}'` });
            return;
        }
        if (req.body.groupname) {
            group.groupname = req.body.groupname;
        }
        if (req.body.rebate) {
            group.rebate = req.body.rebate;
        }
        try {
            await group.update();
            res.send({ success: true, message: 'Group updated' });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while updating group' });
        }
    }
}

export default new ACPUpdateGroupRoute();
