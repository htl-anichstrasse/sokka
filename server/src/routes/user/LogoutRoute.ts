import { NextFunction, Request, Response, Router } from 'express';
import Session from '../../models/Session';
import Route from '../../Route';

class LogoutRoute implements Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        this.router = Router();
        this.path = '/user';
        this.router.post('/login', this.post);
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.token) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        Session.get(req.body.token).then((session) => {
            session.delete().then(() => {
                res.send({ success: true, message: 'Successfully invalidated session' });
            });
        }).catch((err) => {
            res.send({ success: false, message: err.message });
        })
    }
}

export default new LogoutRoute();
