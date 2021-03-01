import { Request, Response, Router } from 'express';
import { Order } from '../../../models/order/Order';
import Route from '../../../Route';
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from '../../RouteAnnotations';

class ACPGetOrderRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/acp';
        this.router.get('/order/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.ACP)
    @NeedsProperties({ date: 'object' }, true)
    private async get(req: Request, res: Response): Promise<void> {
        let date = new Date(String(req.query.date));
        if (isNaN(date.getTime())) {
            res.status(404);
            res.send({ success: false, message: 'Please provide a valid date' });
            return;
        }
        let orders = await Promise.all((await Order.getForDay(date)).map(async (v) => v.getDeep()));
        res.send({ success: true, orders: orders });
    }
}

export default new ACPGetOrderRoute();
