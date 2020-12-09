import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import Route from '../../../Route';

class ACPUpdateGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updategroup', this.post);
        this.fullpath = '/acp/updategroup';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }

        if (!(req.body.group_id && req.body.groupname && req.body.rebate)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPSession.get(req.token).then(() => {
            Group.getById(req.body.group_id).then((group) => {
                if (req.body.groupname) {
                    group.groupname = req.body.groupname;
                }
                if (req.body.rebate) {
                    group.rebate = req.body.rebate;
                }

                // Send update to DB
                group.update().then(() => {
                    res.send({ success: true, message: 'Group updated' });
                }).catch(() => {
                    res.status(500);
                    res.send({ success: false, message: `Could not update group with id '${req.body.group_id}'` });
                });
            }).catch(() => {
                res.status(400);
                res.send({ success: false, message: 'This group does not exist' });
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPUpdateGroupRoute();
