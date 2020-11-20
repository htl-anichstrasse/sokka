import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import User from '../../../models/User';
import Route from '../../../Route';

class ACPDeleteUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deleteuser', this.post);
        this.fullpath = '/acp/deleteuser';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }

        if (!req.body.email) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPSession.get(req.token).then(() => {
            User.getByEmail(req.body.email).then((user) => {
                user.delete().then(() => {
                    res.send({ success: true, message: 'User deleted' });
                }).catch(() => {
                    res.status(500);
                    res.send({ success: false, message: `Could not delete user '${req.body.email}'` });
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

export default new ACPDeleteUserRoute();
