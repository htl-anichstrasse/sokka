import { Request, Response, Router } from 'express';
import Product from '../../../models/product/Product';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization } from '../../RouteAnnotations';

class ACPGetProductRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/product/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    private async get(req: Request, res: Response): Promise<void> {
        try {
            let products = await Product.getAll();
            res.send({ success: true, products: products });
        } catch (err) {
            this.logger.error(err);
            res.status(500);
            res.send({ success: false, message: 'An unknown error occurred while fetching products' });
        }
    }
}

export default new ACPGetProductRoute();
