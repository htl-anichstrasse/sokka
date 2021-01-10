import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import rateLimit = require('express-rate-limit');

class LoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('LoginRoute');

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

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.email || !req.body.password) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let user = await User.getByEmail(req.body.email);
            let same = await bcrypt.compare(req.body.password, user.password);
            if (same) {
                try {
                    let session = await Session.create(user);
                    res.send({ success: true, message: 'Credentials validated', token: session.token });
                } catch (err) {
                    this.handleUnsuccessfulLogin(req, res, err)
                }
            } else {
                this.handleUnsuccessfulLogin(req, res);
            }
        } catch (err) {
            this.handleUnsuccessfulLogin(req, res, err);
        }
    }

    private handleUnsuccessfulLogin(req: Request, res: Response, err?: Error): void {
        let requestedEmail = req.body.email;
        if (err) {
            this.logger.warn(`An unknown error occurred while logging in user '${requestedEmail}': ${err}`);
        }
        res.send({ success: false, message: `Could not retrieve user for email '${requestedEmail}'` });
    }
}

export default new LoginRoute();
