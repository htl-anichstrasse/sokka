import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPDeleteGroupRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deletegroup', this.post);
        this.fullpath = '/acp/deletegroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ group_id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let group = await Group.getById(req.body.group_id);
            await group.delete();
            res.send({ success: true, message: `Successfully deleted group with id '${req.body.group_id}'` });
        } catch (err) {
            if (err.message === 'Group not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `Could not delete group with id '${req.body.group_id}'` });
            this.logger.error(`Could not delete group with id'${req.body.group_id}' with error: ${err}`);
        }
    }
}

export default new ACPDeleteGroupRoute();
