import { Request, Response, Router } from 'express';
import Product from '../../../models/product/Product';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPDeleteMenuRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/product/delete', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ id: 'number' })
    private async post(req: Request, res: Response): Promise<void> {
        try {
            let product = await Product.get(req.body.id);
            if (!product) {
                throw new Error('Product not found');
            }
            await product.delete();
            res.send({ success: true, message: `Successfully deleted product with id '${req.body.id}'` });
        } catch (err) {
            if (err.message === 'Product not found') {
                res.status(400);
                res.send({ success: false, message: err.message });
                return;
            }
            res.status(500);
            res.send({ success: false, message: `An unknown error occurred while deleting product with id '${req.body.id}'` });
            this.logger.error(`An unknown error occurred while deleting product with id '${req.body.id}': ${err}`);
        }
    }
}

export default new ACPDeleteMenuRoute();
