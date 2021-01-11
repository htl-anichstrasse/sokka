import * as bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import config from '../../../Config';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPCreateUserRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/signup', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ name: 'string', password: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        let exists = await ACPUser.exists(req.body.name);
        if (exists) {
            res.send({ success: false, message: 'User already exists' });
            return;
        }
        try {
            let hash = await bcrypt.hash(req.body.password, parseInt(config.readConfigValueSync('SALT_ROUNDS')));
            let user = await ACPUser.create(req.body.name, hash);
            res.send({ success: true, message: `Successfully created user ${user.name}` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while signing up ACP user '${req.body.name}'` });
            this.logger.error(`An unknown error occurred while signing up user '${req.body.name}': ${err}`);
        }
    }
}

export default new ACPCreateUserRoute();
