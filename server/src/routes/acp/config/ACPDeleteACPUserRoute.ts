import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteACPUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPDeleteACPUserRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deleteacpuser', this.post);
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
            res.send({ success: false, message: `Could not delete ACP user with username '${req.body.username}'` });
            this.logger.error(`An unknown error occurred while deleting ACP user '${req.body.username}': ${err}`);
        }
    }
}

export default new ACPDeleteACPUserRoute();
