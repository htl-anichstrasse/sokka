import { Request, Response, Router } from 'express';
import MenuCategory from '../../../../models/menu/MenuCategory';
import Route from '../../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../../RouteAnnotations';

class ACPGetMenuCategoryRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/menu/category/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let menucategories = await MenuCategory.getAll();
            res.send({ success: true, menucategories: menucategories });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching menu categories' });
        }
    }
}

export default new ACPGetMenuCategoryRoute();
