import { Request, Response, Router } from 'express';
import Route from '../Route';
import VerificationService from '../VerificationService';

class VerifyRoute extends Route {
    readonly router: Router;
    readonly path: string;
    readonly fullpath: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/';
        this.router.get('/verify', this.get.bind(this));
        this.fullpath = '/verify';
    }

    private async get(req: Request, res: Response): Promise<void> {
        if (!req.query.id) {
            res.status(400);
            res.send({ success: false, message: 'Invalid verification token' });
            return;
        }
        try {
            let exists = await VerificationService.isVerificationIDValid(req.query.id.toString());
            if (exists) {
                let user = await VerificationService.getVerificationUserForToken(req.query.id.toString());
                await VerificationService.verifyUser(user);
                res.send({ success: true, message: 'Successfully verified user' });
            } else {
                res.send({ success: false, message: `Invalid token '${req.query.id}'` });
            }
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while verifying verification token '${req.query.id}'` });
            this.logger.error(`An unknown error occurred while verifying verification token '${req.query.id}': ${err}`);
        }
    }
}

export default new VerifyRoute();
