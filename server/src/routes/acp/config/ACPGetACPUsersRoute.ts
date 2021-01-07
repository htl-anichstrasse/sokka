import { NextFunction, Request, Response, Router } from 'express';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPGetACPUsersRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getacpusers', this.get);
        this.fullpath = '/acp/getacpusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private get(req: Request, res: Response, next: NextFunction): void {
        ACPUser.getAll().then((users) => {
            res.send({ success: true, users });
            return;
        });
    }
}

export default new ACPGetACPUsersRoute();
