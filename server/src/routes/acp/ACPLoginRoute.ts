import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';

class ACPLoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ACPLoginRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/login', this.post);
        this.fullpath = '/acp/login';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.username || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPUser.get(req.body.username).then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) {
                    ACPLoginRoute.handleUnsuccessfulLogin(req, res, err);
                    ACPLoginRoute.logger.error(`Password comparison failed for ACP user ${user.username}`);
                    return;
                }
                if (same) {
                    ACPSession.create(user).then((session) => {
                        res.send({ success: true, message: 'Credentials validated', token: session.token });
                    }).catch((err) => ACPLoginRoute.handleUnsuccessfulLogin(req, res, err));
                } else {
                    ACPLoginRoute.handleUnsuccessfulLogin(req, res);
                }
            });
        }).catch((err) => ACPLoginRoute.handleUnsuccessfulLogin(req, res, err));
    }

    private static handleUnsuccessfulLogin(req: Request, res: Response, err?: Error): void {
        let requestedUsername = req.body.username;
        if (err) {
            ACPLoginRoute.logger.warn(`Unsuccessful ACP login attempt for requested user '${requestedUsername}' with error: ${err}`);
        }
        res.send({ success: false, message: `Could not retrieve user '${requestedUsername}'` });
    }
}

export default new ACPLoginRoute();
