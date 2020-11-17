import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';

class ACPGetACPUsersRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getacpusers', this.get);
        this.fullpath = '/acp/getacpusers';
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }
        ACPSession.get(req.token).then(() => {
            ACPUser.getAll().then((users) => {
                res.send({ success: true, users });
                return;
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPGetACPUsersRoute();
