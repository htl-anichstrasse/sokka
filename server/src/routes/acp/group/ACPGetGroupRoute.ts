import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetGroupRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/group/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let groups = await Group.getAll();
            res.send({ success: true, groups });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching groups' });
        }
    }
}

export default new ACPGetGroupRoute();
