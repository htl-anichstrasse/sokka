import { NextFunction, Request, Response, Router } from 'express';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPCreateGroupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/creategroup', this.post);
        this.fullpath = '/acp/creategroup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.groupname || !req.body.rebate) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        Group.create(req.body.groupname, req.body.rebate).then((group) => {
            res.send({ success: true, message: `Created group with id ${group.id}` });
        }).catch((err) => {
            res.status(500);
            res.send({ success: false, message: err.message });
        });
    }
}

export default new ACPCreateGroupRoute();
