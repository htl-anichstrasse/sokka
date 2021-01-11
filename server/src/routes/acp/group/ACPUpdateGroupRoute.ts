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
    @NeedsProperties({ id: 'number', name: 'string', rebate: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        let group;
        try {
            group = await Group.getById(req.body.id);
        } catch {
            res.status(400);
            res.send({ success: false, message: `Could not find group with id '${req.body.id}'` });
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
