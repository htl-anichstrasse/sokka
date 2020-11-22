import { NextFunction, Request, Response, Router } from 'express';
import ACPSession from '../../../models/acp/ACPSession';
import Group from '../../../models/Group';
import User from '../../../models/User';
import Route from '../../../Route';

class ACPUpdateUserRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/updateuser', this.post);
        this.fullpath = '/acp/updateuser';
    }

    private post(req: Request, res: Response, next: NextFunction): void {
        if (!req.token) {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
            return;
        }

        if (!(req.body.email && req.body.user)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }

        const updateGroup = (user: User, req: Request): Promise<User> => {
            return new Promise<User>((resolve, reject) => {
                if (req.body.user.group) {
                    Group.getById(req.body.user.group).then((group) => {
                        user.group = group;
                        resolve(user);
                    }).catch((err) => reject(err));
                } else {
                    resolve(user);
                }
            });
        }

        ACPSession.get(req.token).then(() => {
            User.getByEmail(req.body.email).then((user) => {
                if (req.body.user.email) {
                    user.email = req.body.user.email;
                }
                if (req.body.user.password) {
                    user.password = req.body.user.password;
                }
                if (req.body.user.verified) {
                    user.verified = req.body.user.veriifed;
                }

                updateGroup(user, req).then((user) => {
                    console.log(user);
                    user.update().then(() => {
                        res.send({ success: true, message: 'User updated' });
                    }).catch(() => {
                        res.status(500);
                        res.send({ success: false, message: `Could not update user '${req.body.email}'` });
                    });
                }).catch(() => {
                    res.status(400);
                    res.send({ success: false, message: 'This group does not exist' });
                });
            }).catch((err) => {
                res.status(400);
                res.send({ success: false, message: err.message });
            });
        }).catch(() => {
            res.status(401);
            res.send({ success: false, message: 'Authorization required' });
        });
    }
}

export default new ACPUpdateUserRoute();
