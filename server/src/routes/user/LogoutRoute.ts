import { Request, Response, Router } from 'express';
import Session from '../../models/Session';
import Route from '../../Route';

class LogoutRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        this.fullpath = '/user/login';
        this.router.post('/login', this.post.bind(this));
    }

    private async post(req: Request, res: Response): Promise<void> {
        if (!req.body.token) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        try {
            let session = await Session.get(req.body.token);
            await session.delete();
            res.send({ success: true, message: 'Successfully invalidated session' });
        } catch (err) {
            if (err.message === 'Session not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: 'An unknown error occured while invalidating session token' });
            this.logger.error(`An unknown error occured while invalidating session token: ${err}`);
        }
    }
}

export default new LogoutRoute();
