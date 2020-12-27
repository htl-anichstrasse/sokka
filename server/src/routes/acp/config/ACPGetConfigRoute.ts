import { NextFunction, Request, Response, Router } from 'express';
import ACPConfigValue from '../../../models/acp/ACPConfigValue';
import Route from '../../../Route';

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

    private get(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }
        ACPConfigValue.getAll().then((value) => {
            res.send({ success: true, data: value });
        }).catch((err) => {
            res.status(500);
            res.send({ success: false, message: err });
        });
    }
}

export default new ACPGetConfigRoute();
