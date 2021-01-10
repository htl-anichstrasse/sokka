import { Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import ACPSession from '../../models/acp/ACPSession';
import Route from '../../Route';

class ACPLogoutRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    readonly logger = log4js.getLogger('ACPLogoutRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.fullpath = '/acp/logout';
        this.router.post('/logout', this.post);
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.token) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let session = await ACPSession.get(req.body.token);
            await session.delete();
            res.send({ success: true, message: 'Successfully invalidated session' });
        } catch (err) {
            if (err.message === 'ACP Session not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: 'An unknown error occured while invalidating ACP session token' });
            this.logger.error(`An unknown error occured while invalidating ACP session token: ${err}`);
        }
    }
}

export default new ACPLogoutRoute();
