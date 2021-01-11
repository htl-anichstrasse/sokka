import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class ACPLoginRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/login', this.post.bind(this));
        this.fullpath = '/acp/login';
    }

    @NeedsProperties({ username: 'string', password: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await ACPUser.get(req.body.username);
            let same = await bcrypt.compare(req.body.password, user.password);
            if (same) {
                try {
                    let session = await ACPSession.create(user);
                    res.send({ success: true, message: 'Credentials validated', token: session.token, username: user.username });
                } catch (err) {
                    res.status(500);
                    res.send({ success: false, message: `An unknown error occurred while creating a session for '${req.body.username}'` });
                    this.logger.error(`An unknown error occurred while creating a session for '${req.body.username}': ${err}`);
                }
            } else {
                res.send({ success: false, message: `Could not retrieve ACP user '${req.body.username}'` });
            }
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.status(400);
                res.send({ success: false, message: `Could not retrieve ACP user '${req.body.username}'` });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while checking credentials for '${req.body.username}'` });
            this.logger.error(`An unknown error occurred while checking credentials for '${req.body.username}': ${err}`);
        }
    }
}

export default new ACPLoginRoute();
