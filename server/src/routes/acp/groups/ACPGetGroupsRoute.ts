import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import Route from '../../../Route';

class ACPGetGroupsRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getgroups', this.get);
        this.fullpath = '/acp/getgroups';
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }
        ACPSession.get(req.token).then(() => {
            Group.getAll().then((groups) => {
                res.send({ success: true, groups });
                return;
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPGetGroupsRoute();
