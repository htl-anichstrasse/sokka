import { Request, Response, Router } from 'express';
import Product from '../../../models/product/Product';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPCreateProductRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/product/create', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ name: 'string', category_id: 'number', image_id: 'string', price: 'number', hidden: 'boolean' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let product = await Product.create(req.body.category_id, req.body.name, req.body.image_id, req.body.price, req.body.hidden);
            res.send({ success: true, message: `Successfully created product with id '${product.id}'` });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while creating product '${req.body.name}'` });
            this.logger.error(`An unknown error occured while creating product '${req.body.name}': ${err}`);
        }
    }
}

export default new ACPCreateProductRoute();
