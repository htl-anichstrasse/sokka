import { Request, Response, Router } from 'express';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteACPUserRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deleteacpuser', this.post.bind(this));
        this.fullpath = '/acp/deleteacpuser';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ name: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await ACPUser.get(req.body.name);
            await user.delete();
            res.send({ success: true, message: `Successfully deleted ACP user with username '${req.body.name}'` });
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting ACP user '${req.body.name}'` });
            this.logger.error(`An unknown error occurred while deleting ACP user '${req.body.name}': ${err}`);
        }
    }
}

export default new ACPDeleteACPUserRoute();
