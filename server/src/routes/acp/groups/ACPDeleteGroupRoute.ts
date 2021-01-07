import { NextFunction, Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPDeleteGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deletegroup', this.post);
        this.fullpath = '/acp/deletegroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.group_id) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        Group.getById(req.body.group_id).then((group) => {
            group.delete().then(() => {
                res.send({ success: true, message: 'Group deleted' });
            }).catch(() => {
                res.status(500);
                res.send({ success: false, message: `Could not delete group with id '${req.body.group_id}'` });
            });
        }).catch((err) => {
            res.status(400);
            res.send({ success: false, message: err.message });
        });
    }
}

export default new ACPDeleteGroupRoute();
