import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteGroupRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/deletegroup', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let group = await Group.getById(req.body.id);
            await group.delete();
            res.send({ success: true, message: `Successfully deleted group with id '${req.body.id}'` });
        } catch (err) {
            if (err.message === 'Group not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting group with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while deleting group with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPDeleteGroupRoute();
