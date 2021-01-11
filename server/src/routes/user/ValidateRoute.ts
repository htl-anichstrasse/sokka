import { Request, Response, Router } from 'express';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class ValidateRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        this.router.post('/validate', this.post.bind(this));
    }

    @NeedsProperties({ token: 'string', email: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
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
            res.send({ success: false, message: 'An unknown error occurred while validating session token' });
            this.logger.error(`An unknown error occurred while validating session token: ${err}`);
        }
    }
}

export default new ValidateRoute();
