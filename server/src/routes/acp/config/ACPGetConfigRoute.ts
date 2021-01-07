import { NextFunction, Request, Response, Router } from 'express';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPGetConfigRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.get('/getconfig', this.get);
        this.fullpath = '/acp/getconfig';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private get(req: Request, res: Response, next: NextFunction): void {
        ACPConfigValue.getAll().then((value) => {
            res.send({ success: true, data: value });
        }).catch((err) => {
            res.status(500);
            res.send({ success: false, message: err });
        });
    }
}

export default new ACPGetConfigRoute();
