import { Request, Response, Router } from 'express';
import Product from '../../models/product/Product';
import Route from '../../Route';
import { AuthorizationType, NeedsAuthorization } from '../RouteAnnotations';

class GetProductRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/product';
        this.router.get('/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    private async get(req: Request, res: Response): Promise<void> {
        let products = await Product.getAll();
        const limit = parseInt(String(req.query.limit));
        if (req.query.limit && !isNaN(limit)) {
            products = products.slice(0, limit);
        }
        for (let i = 0; i < products.length; i++) {
            products[i]['category'] = await products[i].getCategory();
            delete products[i]['category_id'];
        }
        res.send({
            success: true,
            data: products
        });
    }
}

export default new GetProductRoute();
