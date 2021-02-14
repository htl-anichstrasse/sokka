import { Request, Response, Router } from 'express';
import ProductCategory from '../../../../models/product/ProductCategory';
import Route from '../../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../../RouteAnnotations';

class ACPGetProductCategory extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/product/category/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let productcategories = await ProductCategory.getAll();
            res.send({ success: true, productcategories: productcategories });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching product categories' });
        }
    }
}

export default new ACPGetProductCategory();
