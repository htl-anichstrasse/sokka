import { Request, Response, Router } from 'express';
import ACPSession from '../../models/acp/ACPSession';
import ACPUser from '../../models/acp/ACPUser';
import Route from '../../Route';
import { NeedsProperties } from '../RouteAnnotations';

class ACPValidateRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/validate', this.post.bind(this));
    }

    @NeedsProperties({ token: 'string', name: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let user = await ACPUser.get(req.body.name);
            let result = await ACPSession.validate(user, req.body.token);
            if (user && result) {
                res.send({ success: true, message: 'ACP token for this email is valid' });
            } else {
                res.send({ success: false, message: `Could not validate ACP token for username '${req.body.name}'` })
            }
        } catch (err) {
            if (err.message === 'ACP user not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while validating ACP session token' });
            this.logger.error(`An unknown error occurred while validating ACP session token: ${err}`);
        }
    }
}

export default new ACPValidateRoute();
