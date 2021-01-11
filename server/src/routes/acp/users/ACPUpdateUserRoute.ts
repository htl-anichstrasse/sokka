import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateUserRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateuser', this.post.bind(this));
        this.fullpath = '/acp/updateuser';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ email: 'string', user: 'object' })
    private async post(req: Request, res: Response): Promise<void> {
        let user;
        try {
            user = await User.getByEmail(req.body.email);
        } catch {
            res.status(400);
            res.send({ success: false, message: `Could not find user with email '${req.body.email}'` })
            return;
        }
        if (req.body.user.email) {
            user.email = req.body.user.email;
        }
        if (req.body.user.password) {
            user.password = req.body.user.password;
        }
        if (req.body.user.verified) {
            user.verified = req.body.user.veriifed;
        }
        if (req.body.user.group) {
            try {
                let group = await Group.getById(req.body.user.group);
                user.group_id = group.id;
            } catch {
                res.status(400);
                res.send({ success: false, message: `Group with id '${req.body.user.group}' not found` });
                return;
            }
        }
        try {
            await user.update();
            res.send({ success: true, message: 'User updated' });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating user '${req.body.user.email}'` });
            this.logger.error(`An unknown error occurred while updating user '${req.body.user.email}': ${err}`);
        }
    }
}

export default new ACPUpdateUserRoute();
