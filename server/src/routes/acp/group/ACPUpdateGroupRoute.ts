import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateGroupRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/group/update', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' }, false, true)
    private async post(req: Request, res: Response): Promise<void> {
        let group;
        try {
            group = await Group.getById(req.body.id);
            if (!group) {
                throw new Error('Group not found');
            }
        } catch (err) {
            res.status(400);
            res.send({ success: false, message: err.message });
            return;
        }
        if (req.body.name) {
            group.name = req.body.name;
        }
        if (req.body.rebate) {
            group.rebate = req.body.rebate;
        }
        try {
            await group.update();
            res.send({ success: true, message: 'Successfully updated group' });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating group with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while updating group with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPUpdateGroupRoute();
