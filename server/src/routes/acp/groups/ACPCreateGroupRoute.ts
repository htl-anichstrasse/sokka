import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import Route from '../../../Route';

class ACPCreateGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/creategroup', this.post);
        this.fullpath = '/acp/creategroup';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }

        if (!req.body.groupname || !req.body.rebate) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPSession.get(req.token).then(() => {
            Group.create(req.body.groupname, req.body.rebate).then((group) => {
                res.send({ success: true, message: `Created group with id ${group.id}` });
            }).catch((err) => {
                res.status(500);
                res.send({ success: false, message: err.message });
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPCreateGroupRoute();
