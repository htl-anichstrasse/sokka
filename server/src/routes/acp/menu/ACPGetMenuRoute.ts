import { Request, Response, Router } from 'express';
import Menu from '../../../models/menu/Menu';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/menu/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let menus = await Menu.getAll();
            res.send({ success: true, menus: menus });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching menus' });
        }
    }
}

export default new ACPGetMenuRoute();
