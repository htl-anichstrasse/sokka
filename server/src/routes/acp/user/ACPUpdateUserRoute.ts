import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateUserRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/user/update', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' }, false, true)
    private async post(req: Request, res: Response): Promise<void> {
        let user;
        try {
            user = await User.getById(req.body.id);
            if (!user) {
                throw new Error('User not found');
            }
        } catch (err) {
            res.status(400);
            res.send({ success: false, message: err.message })
            return;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.verified != null) {
            user.verified = req.body.verified;
        }
        if (req.body.group) {
            try {
                let group = await Group.getById(req.body.group);
                if (!group) {
                    throw new Error('Group not found')
                }
                user.group_id = group.id;
            } catch (err) {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
        }
        try {
            await user.update();
            res.send({ success: true, message: 'Successfully updated user' });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating user with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while updating user with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPUpdateUserRoute();
