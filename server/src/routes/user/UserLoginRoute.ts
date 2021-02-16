import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';
import rateLimit = require('express-rate-limit');

class UserLoginRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        const loginLimiter = rateLimit({
            windowMs: 10 * 60 * 1000, // 10 minutes
            max: 5,
            handler: (req, res) => {
                res.send({ success: false, message: 'Too many login attempts, please try again later' });
            }
        });
        this.router.post('/login', loginLimiter, this.post.bind(this));
    }

    @NeedsProperties({ email: 'string', password: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await User.getByEmail(req.body.email);
            let same = await bcrypt.compare(req.body.password, user.password);
            if (user && same) {
                try {
                    let session = await Session.create(user);
                    res.send({ success: true, message: 'Credentials validated', token: session.token });
                } catch (err) {
                    res.status(500);
                    res.send({ success: false, message: `An unknown error occurred while creating a session for '${req.body.username}'` });
                    this.logger.error(`An unknown error occurred while creating a session for '${req.body.username}': ${err}`);
                }
            } else {
                res.send({ success: false, message: `Could not retrieve user '${req.body.username}'` });
            }
        } catch (err) {
            if (err.message === 'User not found') {
                res.send({ success: false, message: `Could not retrieve user '${req.body.username}'` });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while checking credentials for '${req.body.username}'` });
            this.logger.error(`An unknown error occurred while checking credentials for '${req.body.username}': ${err}`);
        }
    }
}

export default new UserLoginRoute();
