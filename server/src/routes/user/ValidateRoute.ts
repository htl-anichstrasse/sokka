import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';

class ValidateRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ValidateRoute');

    constructor() {
        this.router = Router();
        this.path = '/user';
        this.router.post('/validate', this.post);
        this.fullpath = '/user/validate';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token || !req.body.email) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        User.getByEmail(req.body.email).then((user) => {
            Session.validate(user, req.body.token).then((result) => {
                if (result) {
                    res.send({ success: true, message: 'Token for this email is valid' });
                } else {
                    ValidateRoute.handleInvalidToken(req, res);
                }
            }).catch((err) => ValidateRoute.handleInvalidToken(req, res, err));
        }).catch((err) => ValidateRoute.handleInvalidToken(req, res, err));
    }

    private static handleInvalidToken(req: Request, res: Response, err?: Error): void {
        let requestedEmail = req.body.email;
        if (err) {
            ValidateRoute.logger.warn(`Unsuccessful token validation for '${requestedEmail}' with error: ${err}`);
        }
        res.status(500);
        res.send({ success: false, message: `Could not validate token for email '${requestedEmail}'` });
    }
}

export default new ValidateRoute();
