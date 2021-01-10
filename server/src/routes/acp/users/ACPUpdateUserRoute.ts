import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import Group from '../../../models/Group';
import User from '../../../models/User';
import Route from '../../../Route';

class ACPUpdateUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPUpdateUserRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateuser', this.post);
        this.fullpath = '/acp/updateuser';
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!(req.body.email && req.body.user)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        let user;
        try {
            user = await User.getByEmail(req.body.email);
        } catch {
            res.status(400);
            res.send({ success: false, message: `Group with email '${req.body.email}' not found` })
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
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while updating user' });
        }
    }
}

export default new ACPUpdateUserRoute();
