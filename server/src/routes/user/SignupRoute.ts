import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import rateLimit = require('express-rate-limit');
import FormData = require('form-data');

class SignupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('SignupRoute');

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

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!(req.body.email && req.body.password)) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        if (!req.body.tos || !req.body.privacypolicy) {
            res.send({ sucess: false, message: 'Please accept our terms of service and privacy policy!' });
            return;
        }

        User.exists(req.body.email).then((exists) => {
            if (exists) {
                res.send({ success: false, message: 'User already exists' });
                return;
            }

            bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
                if (err) throw err;
                User.create(req.body.email, hash).then((user) => {
                    Session.create(user).then((session) => {
                        res.send({ success: true, message: 'Successfully created user', token: session.token });
                        // TODO: Send verification mail
                    }).catch((err) => SignupRoute.handleUnsuccessfulSignup(req, res, err));
                }).catch((err) => SignupRoute.handleUnsuccessfulSignup(req, res, err));
            });
        });
    }

    private static handleUnsuccessfulSignup(req: Request, res: Response, err?: Error): void {
        let requestedEmail = req.body.email;
        if (err) {
            SignupRoute.logger.warn(`Unsuccessful signup attempt for email '${requestedEmail}' with error: ${err.message}`);
        }
        res.send({ success: false, message: `Could not sign up user for email '${requestedEmail}'` });
    }
}

export default new SignupRoute();
