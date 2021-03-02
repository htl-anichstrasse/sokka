import { Request, Response, Router } from 'express';
import { Order } from '../../../models/order/Order';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPInvalidateOrderRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.post('/order/invalidate', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ order: 'string' })
    private async post(req: Request, res: Response): Promise<void> {
        let orderSplit = req.body.order.split(':');
        if (orderSplit.length != 2) {
            res.status(400);
            res.send({ success: false, message: 'Invalid order' });
            return;
        }
        let order = await Order.get(orderSplit[1]);
        await order.invalidate();
        res.send({ success: true, message: 'Invalidated order' });
    }
}

export default new ACPInvalidateOrderRoute();
