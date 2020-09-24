import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import Route from '../../Route';

class LogoutRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('LogoutRoute');

    constructor() {
        this.router = Router();
        this.path = '/user';
        this.fullpath = '/user/login';
        this.router.post('/login', this.post);
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        Session.get(req.body.token).then((session) => {
            session.delete().then(() => {
                res.send({ success: true, message: 'Successfully invalidated session' });
            });
        }).catch((err) => {
            res.send({ success: false, message: err.message });
            LogoutRoute.logger.warn(`Could not invalidate session for token '${req.body.token}': ${err}`);
        })
    }
}

export default new LogoutRoute();
