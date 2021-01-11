import { Request, Response, Router } from 'express';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetUsersRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getusers', this.get.bind(this));
        this.fullpath = '/acp/getusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let users = await User.getAll();
            res.send({ success: true, users });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching ACP users' });
            this.logger.error(`An unknown error occured while fetching ACP users: ${err}`);
        }
    }
}

export default new ACPGetUsersRoute();
