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
