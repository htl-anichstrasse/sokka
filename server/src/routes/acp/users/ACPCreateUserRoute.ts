import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import config from '../../../Config';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPCreateUserRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/signup', this.post.bind(this));
        this.fullpath = '/acp/signup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ username: 'string', password: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        if (!(req.body.username && req.body.password)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        let exists = await ACPUser.exists(req.body.username);
        if (exists) {
            res.send({ success: false, message: 'User already exists' });
            return;
        }
        try {
            let hash = await bcrypt.hash(req.body.password, parseInt(config.readConfigValueSync('SALT_ROUNDS')));
            let user = await ACPUser.create(req.body.username, hash);
            res.send({ success: true, message: `Successfully created user ${user.username}` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while signing up ACP user' });
            this.logger.error(`An unknown error occurred while signing up user '${req.body.username}' with error: ${err}`);
        }
    }
}

export default new ACPCreateUserRoute();
