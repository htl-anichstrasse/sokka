import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import Route from '../../../Route';

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

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }

        if (!req.body.group_id) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPSession.get(req.token).then(() => {
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
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPDeleteGroupRoute();
