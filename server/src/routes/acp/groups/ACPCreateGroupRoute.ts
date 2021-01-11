import { Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPCreateGroupRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/creategroup', this.post.bind(this));
        this.fullpath = '/acp/creategroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ groupname: 'string', rebate: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let group = await Group.create(req.body.groupname, req.body.rebate);
            res.send({ success: true, message: `Successfully created group with id '${group.id}'` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while creating group' });
            this.logger.error(`An unknown error occured while creating group with name '${req.body.groupname}': ${err}`);
        }
    }
}

export default new ACPCreateGroupRoute();
