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
        let orderSplit = String(req.query.order).split(':');
        if (orderSplit.length != 2) {
            res.send({ success: false, message: 'Invalid order' });
            return;
        }
        let userId = parseInt(orderSplit[0]);
        let orderId = parseInt(orderSplit[1]);
        if (isNaN(userId) || isNaN(orderId)) {
            res.send({ success: false, message: 'Invalid order' });
            return;
        }
        try {
            let user = await User.getById(userId);
            let order = await Order.get(orderId);
            let predicateMap = {
                "Order does not belong to user": order.user_id === user.id,
                "Order was not created yesterday": (new Date(order.timestamp).getDay() - new Date().getDay()) === -1,
                "Order was invalidated": order.state === 'VALID'
            }
            if (Object.values(predicateMap).every(v => v)) {
                res.send({ success: true, valid: true, order: await order.getDeep() });
            } else {
                let reasons = Object.keys(predicateMap).filter((v) => !predicateMap[v]);
                res.send({ success: true, valid: false, reasons });
            }
        } catch (e) {
            res.send({ success: false, message: e.message });
            return;
        }
    }
}

export default new ACPValidateOrderRoute();
