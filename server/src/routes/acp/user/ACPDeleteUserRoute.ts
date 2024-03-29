import { Request, Response, Router } from 'express';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteUserRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/user/delete', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await User.getById(req.body.id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.delete();
            res.send({ success: true, message: `Successfully deleted user with id '${req.body.id}'` });
        } catch (err) {
            if (err.message === 'User not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting user with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while deleting user with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPDeleteUserRoute();
