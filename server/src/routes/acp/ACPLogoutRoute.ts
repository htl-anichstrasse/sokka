import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import Route from '../../Route';

class ACPLogoutRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ACPLogoutRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/logout', this.post);
        this.fullpath = '/acp/logout';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPSession.get(req.body.token).then((session) => {
            session.delete().then(() => {
                res.send({ success: true, message: 'Successfully invalidated session' });
            });
        }).catch((err) => {
            res.send({ success: false, message: err.message });
            ACPLogoutRoute.logger.warn(`Could not invalidate session for token '${req.body.token}': ${err}`);
        });
    }
}

export default new ACPLogoutRoute();
