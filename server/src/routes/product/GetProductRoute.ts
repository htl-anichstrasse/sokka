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
        let products;
        const id = parseInt(String(req.query.id));
        try {
            if (!isNaN(id)) {
                products = [await Product.get(id)];
            } else {
                products = await Product.getAll();
            }
        } catch (err) {
            products = []; // no products found
        }
        for (let i = 0; i < products.length; i++) {
            products[i]['category'] = await products[i].getCategory();
            delete products[i]['category_id'];
            if (Boolean(req.query.noimage) === true) {
                delete products[i].image;
            }
        }
        res.send({
            success: true,
            data: products
        });
    }
}

export default new GetProductRoute();
