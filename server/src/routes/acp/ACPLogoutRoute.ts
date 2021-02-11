import { Request, Response, Router } from 'express';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class ACPLogoutRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/logout', this.post.bind(this));
    }

    @NeedsProperties({ username: 'string', token: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let session = await ACPSession.get(await ACPUser.get(req.body.username), req.body.token);
            if (!session) {
                throw new Error('ACP Session not found');
            }
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
