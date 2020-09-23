import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import FormData = require('form-data');

class SignupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private readonly logger: log4js.Logger;

    constructor() {
        this.router = Router();
        this.logger = log4js.getLogger('SignupRoute');
        this.path = '/user';
        this.router.post('/signup', this.post);
        this.fullpath = '/user/signup';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token || !req.body.email || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        if (!req.body.tos || !req.body.privacypolicy) {
            res.send({ sucess: false, message: 'Please accept our terms of service and privacy policy!'});
            return;
        }

        User.exists(req.body.email).then((exists) => {
            if (!exists) {
                res.send({ success: false, message: 'User already exists' });
                return;
            }

            let formData = new FormData();
            formData.append('secret', process.env.V3_PRIVATE);
            formData.append('response', req.body.token);
            formData.append('remoteip', req.ip);
            axios({
                method: 'post',
                url: 'https://www.google.com/recaptcha/api/siteverify',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((captchaRes) => {
                res.send(captchaRes);
                bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), (err, hash) => {
                    if (err) throw err;
                    User.create(req.body.email, hash).then((user) => {
                        Session.create(user).then((session) => {
                            res.send({ success: true, message: 'Successfully created user', token: session.token });
                            // TODO: Send verification mail
                        }).catch((err) => this.handleUnsuccessfulSignup(req, res, err));
                    }).catch((err) => this.handleUnsuccessfulSignup(req, res, err));
                });
            }).catch((err) => {
                res.send({ success: false, message: `Failed to validate captcha: ${err.message}` });
            });
        });
    }

    private handleUnsuccessfulSignup(req: Request, res: Response, err?: Error): void {
        let requestedEmail = req.body.email;
        if (err) {
            this.logger.warn(`Unsuccessful signup attempt for email '${requestedEmail}' with error: ${err.message}`);
        }
        res.send({ success: false, message: `Could not sign up user for email '${requestedEmail}'` });
    }
}

export default new SignupRoute();
