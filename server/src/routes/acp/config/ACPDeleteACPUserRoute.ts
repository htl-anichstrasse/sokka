import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../../models/acp/ACPSession';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';

class ACPDeleteACPUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ACPDeleteACPUserRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deleteacpuser', this.post);
        this.fullpath = '/acp/deleteacpuser';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }
        ACPSession.get(req.token).then(() => {
            if (!req.body.username) {
                res.status(400);
                res.send({ success: false, message: 'Invalid parameters' });
                return;
            }
            ACPUser.get(req.body.username).then((user) => {
                user.delete().then(() => {
                    res.send({ success: true, message: 'Successfully deleted ACP user' });
                }).catch((err) => ACPDeleteACPUserRoute.handleUnsuccessfulDelete(req, res, err));
            }).catch((err) => ACPDeleteACPUserRoute.handleUnsuccessfulDelete(req, res, err));
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }

    private static handleUnsuccessfulDelete(req: Request, res: Response, err?: Error): void {
        let requestedUsername = req.body.username;
        if (err) {
            ACPDeleteACPUserRoute.logger.warn(`Could not delete ACP user '${requestedUsername}' with error: ${err.message}`);
        }
        res.status(500);
        res.send({ success: false, message: `Could not delete ACP user '${requestedUsername}'` });
    }
}

export default new ACPDeleteACPUserRoute();
