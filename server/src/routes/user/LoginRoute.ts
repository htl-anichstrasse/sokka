import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import rateLimit = require('express-rate-limit');

class LoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('LoginRoute');

    constructor() {
        this.router = Router();
        this.path = '/user';
        const loginLimiter = rateLimit({
            windowMs: 10 * 60 * 1000, // 10 minutes
            max: 5,
            message: `{ success: false, message: 'Too many login attempts from this IP, please try again later' }`
        });
        this.router.post('/login', this.post, loginLimiter);
        this.fullpath = '/user/login';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.email || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        User.get(req.body.email).then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) {
                    LoginRoute.handleUnsuccessfulLogin(req, res, err);
                    LoginRoute.logger.error(`Password comparison failed for user ${user.id}`);
                    return;
                }
                if (same) {
                    Session.create(user).then((session) => {
                        res.send({ success: true, message: 'Credentials validated', token: session.token });
                    }).catch((err) => LoginRoute.handleUnsuccessfulLogin(req, res, err));
                } else {
                    LoginRoute.handleUnsuccessfulLogin(req, res);
                }
            });
        }).catch((err) => LoginRoute.handleUnsuccessfulLogin(req, res, err));
    }

    private static handleUnsuccessfulLogin(req: Request, res: Response, err?: Error): void {
        let requestedEmail = req.body.email;
        if (err) {
            LoginRoute.logger.warn(`Unsuccessful login attempt for requested user '${requestedEmail}' with error: ${err.message}`);
        }
        res.send({ success: false, message: `Could not retrieve user for email '${requestedEmail}'` });
    }
}

export default new LoginRoute();
