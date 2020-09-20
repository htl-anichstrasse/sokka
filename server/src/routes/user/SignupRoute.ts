import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import User from '../../models/User';
import Route from '../../Route';

class SignupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    private readonly logger: log4js.Logger;

    constructor() {
        this.router = Router();
        this.logger = log4js.getLogger('SignupRoute');
        this.path = '/user/create';
        this.router.get(this.path, this.get);
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token || !req.body.email || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        // TODO: email validation

        // Captcha challenge
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
                    this.logger.info(user);
                });
            });
        });
    }
}

export default new SignupRoute();
