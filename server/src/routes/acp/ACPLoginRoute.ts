import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';
import rateLimit = require('express-rate-limit');

class ACPLoginRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        const loginLimiter = rateLimit({
            windowMs: 1 * 1000 * 60, // 5 minutes
            max: 5,
            handler: (req, res) => {
                res.header({ "Content-Type": "application/json" });
                res.send({ success: false, message: 'Too many failed login attempts, please try again later' });
            }
        });
        this.router.post('/login', loginLimiter, this.post.bind(this));
    }

    @NeedsProperties({ name: 'string', password: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await ACPUser.get(req.body.name);
            let same = await bcrypt.compare(req.body.password, user.password);
            if (user && same) {
                try {
                    let session = await ACPSession.create(user);
                    res.send({ success: true, message: 'Credentials validated', token: session.token, name: user.name });
                } catch (err) {
                    res.status(500);
                    res.send({ success: false, message: `An unknown error occurred while creating a session for '${req.body.name}'` });
                    this.logger.error(`An unknown error occurred while creating a session for '${req.body.name}': ${err}`);
                }
            } else {
                res.send({ success: false, message: `Could not retrieve ACP user '${req.body.name}'` });
            }
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.send({ success: false, message: `Could not retrieve ACP user '${req.body.name}'` });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while checking credentials for '${req.body.name}'` });
            this.logger.error(`An unknown error occurred while checking credentials for '${req.body.name}': ${err}`);
        }
    }
}

export default new ACPLoginRoute();
