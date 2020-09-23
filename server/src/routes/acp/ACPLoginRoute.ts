import { rejects } from 'assert';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';

class ACPLoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    private readonly logger: log4js.Logger;

    constructor() {
        this.router = Router();
        this.logger = log4js.getLogger('ACPLoginRoute');
        this.path = '/acp';
        this.router.post('/login', this.post);
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.username || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPUser.get(req.body.email).then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) {
                    this.handleUnsuccessfulLogin(res);
                    this.logger.error(`Password comparison failed for ACP user ${user.username}`);
                    return;
                }
                if (same) {
                    ACPSession.create(user).then((session) => {
                        res.send({ success: true, message: 'Credentials validated', token: session.token });
                    }).catch((err) => rejects(err));
                } else {
                    this.handleUnsuccessfulLogin(res);
                }
            });
        }).catch((err) => this.handleUnsuccessfulLogin(res, err));
    }

    private handleUnsuccessfulLogin(res: Response, err?: Error): void {
        if (err) {
            this.logger.warn(`Unsuccessful ACP login attempt with error: ${err.message}`);
        }
        res.send({ success: false, message: 'Could not retrieve user' });
    }
}

export default new ACPLoginRoute();
