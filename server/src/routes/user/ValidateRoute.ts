import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';

class ValidateRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ValidateRoute');

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        this.router.post('/validate', this.post.bind(this));
        this.fullpath = '/user/validate';
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.token || !req.body.email) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let user = await User.getByEmail(req.body.email);
            let result = await Session.validate(user, req.body.token);
            if (result) {
                res.send({ success: true, message: 'Token for this email is valid' });
            } else {
                res.send({ success: false, message: `Could not validate token for email '${req.body.email}'` });
            }
        } catch (err) {
            if (err.message === 'User not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: 'An unknwon error occurred while validating session token' });
            this.logger.error(`An unknwon error occurred while validating session token: ${err}`);
        }
    }
}

export default new ValidateRoute();
