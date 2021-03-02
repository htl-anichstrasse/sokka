import { Request, Response, Router } from 'express';
import User from '../../models/User';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization } from '../RouteAnnotations';
import rateLimit = require('express-rate-limit');

class UserRequestDataRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        const requestLimiter = rateLimit({
            windowMs: 24 * 60 * 60 * 1000, // 24 hours
            max: 1,
            handler: (req, res) => {
                res.set('Content-Type', 'application/json');
                res.send({ success: false, message: 'Too many data requests, please try again later' });
            }
        });
        this.router.get('/request', requestLimiter, this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    private async get(req: Request, res: Response): Promise<void> {
        let user = await User.getByEmail(Buffer.from(req.token, 'base64').toString('utf-8').split(':')[0]);
        res.send({ success: true, data: await user.requestData() });
    }
}

export default new UserRequestDataRoute();
