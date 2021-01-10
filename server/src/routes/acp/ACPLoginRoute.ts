import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';

class ACPLoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPLoginRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/login', this.post);
        this.fullpath = '/acp/login';
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.username || !req.body.password) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let user = await ACPUser.get(req.body.username);
            let same = await bcrypt.compare(req.body.password, user.password);
            if (same) {
                try {
                    let session = await ACPSession.create(user);
                    res.send({ success: true, message: 'Credentials validated', token: session.token, username: user.username });
                } catch (err) {
                    this.handleUnsuccessfulLogin(req, res, err)
                }
            } else {
                this.handleUnsuccessfulLogin(req, res);
            }
        } catch (err) {
            this.handleUnsuccessfulLogin(req, res, err)
        }
    }

    private handleUnsuccessfulLogin(req: Request, res: Response, err?: Error): void {
        let requestedUsername = req.body.username;
        if (err) {
            this.logger.error(`An unknown error occurred while logging in user '${requestedUsername}': ${err}`);
        }
        res.send({ success: false, message: `Could not retrieve user '${requestedUsername}'` });
    }
}

export default new ACPLoginRoute();
