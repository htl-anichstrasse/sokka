import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import User from '../../models/User';
import Route from '../../Route';

class LoginRoute implements Route {
    readonly router: Router;
    readonly path: string;
    private readonly logger: log4js.Logger;

    constructor() {
        this.router = Router();
        this.logger = log4js.getLogger('LoginRoute');
        this.path = '/user';
        this.router.post('/login', this.post);
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.body.email || !req.body.password) {
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        User.get(req.body.email).then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) {
                    res.send({ success: false, message: `Could not retrieve user` });
                    this.logger.error(`Password comparison failed for user ${user.id}`);
                    return;
                }
                if (same) {
                    res.send({ success: false, message: 'Could not retrieve user' });
                } else {
                    res.send({ success: true, message: 'Credentials validated' });
                    // TODO: create session
                }
            });
        }).catch((err) => {
            res.send({ success: false, message: 'Could not retrieve user' });
        });
    }
}

export default new LoginRoute();
