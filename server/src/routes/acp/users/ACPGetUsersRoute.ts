import { NextFunction, Request, Response, Router } from 'express';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPGetUsersRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getusers', this.get);
        this.fullpath = '/acp/getusers';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private get(req: Request, res: Response, next: NextFunction): void {
        User.getAll().then((users) => {
            res.send({ success: true, users });
            return;
        });
    }
}

export default new ACPGetUsersRoute();
