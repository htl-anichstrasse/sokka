import { Request, Response, Router } from 'express';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetACPUsersRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/acpuser/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let users = await ACPUser.getAll();
            users.forEach((v) => delete v.password);
            res.send({ success: true, users });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching ACP users' });
            this.logger.error(`An unknown error occurred while fetching users: ${err}`);
        }
    }
}

export default new ACPGetACPUsersRoute();
