import axios from 'axios';
import { NextFunction, Request, Response, Router } from 'express';
import Route from '../../Route';

class SignupRoute implements Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        this.router = Router();
        this.path = '/user/signup';
        this.router.get(this.path, this.get);
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token || !req.body.email || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

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
            // TODO: Send signup to database
        });
    }
}

export default new SignupRoute();
