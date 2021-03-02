import { Request, Response, Router } from 'express';
import { Order } from '../../../models/order/Order';
import User from '../../../models/User';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPValidateOrderRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/order/validate', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ order: 'string' }, true)
    private async get(req: Request, res: Response): Promise<void> {
        let orderSplit = req.body.order.split(':');
        if (orderSplit.length != 2) {
            res.status(400);
            res.send({ success: false, message: 'Invalid order' });
            return;
        }
        try {
            let user = await User.getById(orderSplit[0]);
            let order = await Order.get(orderSplit[1]);
            let predicate1 = order.user_id === user.id;
            let predicate2 = (new Date(order.timestamp).getDay() - new Date().getDay()) === -1;
            if (predicate1 && predicate2) {
                // order belongs to user & order was created yesterday
                res.send({ success: true, valid: true, order: await order.getDeep() });
            } else {
                if (!predicate1 && !predicate2) {
                    res.send({ success: true, valid: false, reason: 'Order does not belong to user and order was not created yesterday' });
                } else if (predicate1) {
                    res.send({ success: true, valid: false, reason: 'Order was not created yesterday' });
                } else {
                    res.send({ success: true, valid: false, reason: 'Order does not belong to user' });
                }
            }
        } catch (e) {
            res.send({ success: false, message: e.message });
            return;
        }
    }
}

export default new ACPValidateOrderRoute();
