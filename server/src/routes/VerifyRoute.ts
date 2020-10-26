import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Route from '../Route';
import VerificationService from '../VerificationService';

class VerifyRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('VerifyRoute');

    constructor() {
        this.router = Router();
        this.path = '/';
        this.router.get('/verify', this.get);
        this.fullpath = '/verify';
    }

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.query.id) {
            res.status(400);
            res.send({ success: false, message: 'Invalid verification token' });
            return;
        }

        VerificationService.isVerificationIDValid(req.query.id.toString()).then((exists) => {
            if (exists) {
                VerificationService.getVerificationUserForToken(req.query.id.toString()).then((user) => {
                    VerificationService.verifyUser(user).then(() => {
                        res.send({ success: true, message: 'Successfully verified user' });
                    }).catch((err) => VerifyRoute.handleInvalidToken(req, res, err));
                }).catch((err) => VerifyRoute.handleInvalidToken(req, res, err));
            } else {
                VerifyRoute.handleInvalidToken(req, res);
            }
        }).catch((err) => VerifyRoute.handleInvalidToken(req, res, err));
    }

    private static handleInvalidToken(req: Request, res: Response, err?: Error): void {
        let token = req.query.id;
        if (err) {
            VerifyRoute.logger.warn(`Unsuccessful email verification for token ${token} with error: ${err}`);
        }
        res.status(500);
        res.send({ success: false, message: `Invalid token '${token}'` });
    }
}

export default new VerifyRoute();
