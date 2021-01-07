import { NextFunction, Request, Response, Router } from 'express';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

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

    @NeedsAuthorization(AuthorizationType.ACP)
    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.email) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

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
    }
}

export default new ACPDeleteUserRoute();
