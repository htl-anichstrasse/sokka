import { Request, Response, Router } from 'express';
import User from '../../models/User';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization } from '../RouteAnnotations';

class UserDeleteRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/user';
        this.router.post('/delete', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    private async post(req: Request, res: Response): Promise<void> {
        let user = await User.getByEmail(Buffer.from(req.token, 'base64').toString('utf-8').split(':')[0]);
        await user.delete();
        res.send({ success: true, message: 'User deleted successfully' });
    }
}

export default new UserDeleteRoute();
