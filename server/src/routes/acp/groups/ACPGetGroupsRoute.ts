import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPGetGroupsRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getgroups', this.get);
        this.fullpath = '/acp/getgroups';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private get(req: Request, res: Response, next: NextFunction): void {
        Group.getAll().then((groups) => {
            res.send({ success: true, groups });
            return;
        });
    }
}

export default new ACPGetGroupsRoute();
