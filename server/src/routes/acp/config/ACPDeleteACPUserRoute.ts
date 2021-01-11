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
    @NeedsProperties({ username: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await ACPUser.get(req.body.username);
            await user.delete();
            res.send({ success: true, message: `Successfully deleted ACP user with username '${req.body.username}'` });
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting ACP user '${req.body.username}'` });
            this.logger.error(`An unknown error occurred while deleting ACP user '${req.body.username}': ${err}`);
        }
    }
}

export default new ACPDeleteACPUserRoute();
