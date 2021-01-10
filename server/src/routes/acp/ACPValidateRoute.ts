import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';

class ACPValidateRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPValidateRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/validate', this.post);
        this.fullpath = '/acp/validate';
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.token || !req.body.username) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let user = await ACPUser.get(req.body.username);
            let result = await ACPSession.validate(user, req.body.token);
            if (result) {
                res.send({ success: true, message: 'ACP token for this email is valid' });
            } else {
                res.send({ success: false, message: `Could not validate ACP token for username '${req.body.username}'` })
            }
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: 'An unknwon error occurred while validating ACP session token' });
            this.logger.error(`An unknwon error occurred while validating ACP session token: ${err}`);
        }
    }
}

export default new ACPValidateRoute();
