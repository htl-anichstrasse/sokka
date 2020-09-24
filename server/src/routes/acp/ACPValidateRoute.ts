import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';

class ACPValidateRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ACPValidateRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/validate', this.post);
        this.fullpath = '/acp/validate';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token || !req.body.username) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        ACPUser.get(req.body.username).then((user) => {
            ACPSession.validate(user, req.body.token).then((result) => {
                if (result) {
                    res.send({ success: true, message: 'ACP token for this email is valid' });
                } else {
                    ACPValidateRoute.handleInvalidToken(req, res);
                }
            }).catch((err) => ACPValidateRoute.handleInvalidToken(req, res, err));
        }).catch((err) => ACPValidateRoute.handleInvalidToken(req, res, err));
    }

    private static handleInvalidToken(req: Request, res: Response, err?: Error): void {
        let requestedUsername = req.body.username;
        if (err) {
            ACPValidateRoute.logger.warn(`Unsuccessful ACP token validation for '${requestedUsername}' with error: ${err}`);
        }
        res.send({ success: false, message: `Could not validate ACP token for username '${requestedUsername}'` });
    }
}

export default new ACPValidateRoute();
