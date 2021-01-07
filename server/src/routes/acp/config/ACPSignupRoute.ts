import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response, Router } from 'express';
import * as log4js from 'log4js';
import config from '../../../Config';
import ACPUser from '../../../models/acp/ACPUser';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../NeedsAuthorization';

class ACPSignupRoute implements Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;
    private static readonly logger = log4js.getLogger('ACPSignupRoute');

    constructor() {
        this.router = Router();
        this.path = '/acp';
        this.router.post('/signup', this.post);
        this.fullpath = '/acp/signup';
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private post(req: Request, res: Response, next: NextFunction): void {
        if (!(req.body.username && req.body.password)) {
            res.status(400);
            res.send({ success: false, message: 'Invalid parameters' });
            return;
        }
        ACPUser.exists(req.body.username).then((exists) => {
            if (exists) {
                res.send({ success: false, message: 'User already exists' });
                return;
            }
            bcrypt.hash(req.body.password, parseInt(config.readConfigValueSync('SALT_ROUNDS')), (err, hash) => {
                if (err) throw err;
                ACPUser.create(req.body.username, hash).then((user) => {
                    res.send({ success: true, message: `Successfully created user ${user.username}` });
                }).catch((err) => ACPSignupRoute.handleUnsuccessfulSignup(req, res, err));
            }).catch((err) => ACPSignupRoute.handleUnsuccessfulSignup(req, res, err));
        });
    }

    private static handleUnsuccessfulSignup(req: Request, res: Response, err?: Error): void {
        let requestedUsername = req.body.username;
        if (err) {
            ACPSignupRoute.logger.warn(`Could not create ACP user for '${requestedUsername}' with error: ${err.message}`);
        }
        res.status(500);
        res.send({ success: false, message: `Could not create ACP user for '${requestedUsername}'` });
    }
}

export default new ACPSignupRoute();
