import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import config from '../../Config';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import VerificationService from '../../VerificationService';
import rateLimit = require('express-rate-limit');

class SignupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('SignupRoute');

    constructor() {
        this.router = Router();
        this.path = '/user';
        const signupLimiter = rateLimit({
            windowMs: 30 * 60 * 1000, // 30 minutes
            max: 5,
            message: `{ success: false, message: 'Too many created accounts from this IP, please try again later' }`
        });
        this.router.post('/signup', this.post, signupLimiter);
        this.fullpath = '/user/signup';
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!(req.body.email && req.body.password)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        if (!req.body.tos || !req.body.privacypolicy) {
            res.send({ sucess: false, message: 'Please accept our terms of service and privacy policy' });
            return;
        }
        let exists = await User.exists(req.body.email);
        if (exists) {
            res.send({ success: false, message: 'User already exists' });
            return;
        }
        try {
            let hash = await bcrypt.hash(req.body.password, parseInt(config.readConfigValueSync('SALT_ROUNDS')));
            let user = await User.create(req.body.email, hash);
            let session = await Session.create(user);
            let smtpResponse = await VerificationService.sendVerification(user);
            if (smtpResponse.rejected.length > 0) {
                res.send({ success: false, message: 'Could not send verification mail to the provided email address' });
                this.logger.error(`Could not send verification mail for user '${user.email}'`);
                return;
            }
            res.send({ success: true, message: 'Successfully created user', token: session.token });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while signing up ACP user' });
            this.logger.error(`An unknown error occurred while signing up user '${req.body.username}' with error: ${err}`);
        }
    }
}

export default new SignupRoute();
