import { Request, Response, Router } from 'express';
import Product from '../../../models/product/Product';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPUpdateProductRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/product/update', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        let product;
        try {
            product = await Product.get(req.body.id);
            if (!product) {
                throw new Error('Product not found');
            }
        } catch (err) {
            res.status(400);
            res.send({ success: false, message: err.message });
            return;
        }
        if (req.body.category_id) {
            product.category_id = req.body.category_id;
        }
        if (req.body.name) {
            product.name = req.body.name;
        }
        if (req.body.image) {
            product.image = req.body.image;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }
        if (req.body.hidden) {
            product.hidden = req.body.hidden;
        }
        try {
            await product.update();
            res.send({ success: true, message: 'Successfully updated product' });
        } catch (err) {
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while updating product with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while updating product with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPUpdateProductRoute();
