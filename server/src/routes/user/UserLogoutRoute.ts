import { Request, Response, Router } from 'express';
import Session from '../../models/Session';
import User from '../../models/User';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class UserLogoutRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        this.router.post('/logout', this.post.bind(this));
    }

    @NeedsProperties({ email: 'string', token: 'string ' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let session = await Session.get(await User.getByEmail(req.body.email), req.body.token);
            if (!session) {
                throw new Error('Session not found');
            }
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

export default new UserLogoutRoute();
