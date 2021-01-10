import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPDeleteUserRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deleteuser', this.post);
        this.fullpath = '/acp/deleteuser';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ email: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await User.getByEmail(req.body.email);
            await user.delete();
            res.send({ success: true, message: `Successfully deleted user with email '${req.body.email}'` });
        } catch (err) {
            if (err.message === 'User not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: `Could not delete user '${req.body.email}'` });
        }
    }
}

export default new ACPDeleteUserRoute();
