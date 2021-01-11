import { Request, Response, Router } from 'express';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetACPUsersRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getacpusers', this.get.bind(this));
        this.fullpath = '/acp/getacpusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let users = await ACPUser.getAll();
            res.send({ success: true, users });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching users' });
            this.logger.error(`An unknown error occurred while fetching users: ${err}`);
        }
    }
}

export default new ACPGetACPUsersRoute();
