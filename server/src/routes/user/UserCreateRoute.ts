import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import config from '../../Config';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import VerificationService from '../../VerificationService';
import { NeedsProperties } from '../RouteAnnotations';
import rateLimit = require('express-rate-limit');

class UserCreateRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        const signupLimiter = rateLimit({
            windowMs: 30 * 60 * 1000, // 30 minutes
            max: 5,
            message: `{ success: false, message: 'Too many created accounts from this IP, please try again later' }`
        });
        this.router.post('/create', this.post.bind(this), signupLimiter);
    }

    @NeedsProperties({ email: 'string', password: 'string', tos: 'boolean', privacypolicy: 'boolean' })
    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.tos || !req.body.privacypolicy) {
            res.send({ sucess: false, message: 'Please accept our terms of service and privacy policy' });
            return;
        }

        // Disallow duplicate user creation
        let exists = await User.exists(req.body.email);
        if (exists) {
            res.send({ success: false, message: 'User already exists' });
            return;
        }

        // Validate user email
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(req.body.email).toLowerCase())) {
            res.send({ success: false, message: 'Please provide a valid email address' });
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
            res.send({ success: false, message: 'An unknown error occurred while signing up user' });
            this.logger.error(`An unknown error occurred while signing up user '${req.body.username}' with error: ${err}`);
        }
    }
}

export default new UserCreateRoute();
