import { Request, Response, Router } from "express";
import { DeepOrder, Order } from "../../models/order/Order";
import User from "../../models/User";
import Route from "../../Route";
import { AuthorizationType, NeedsAuthorization } from "../RouteAnnotations";


class GetOrderRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/';
        this.router.get('/order/get', this.get.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    private async get(req: Request, res: Response): Promise<void> {
        let user = await User.getByEmail(Buffer.from(req.token, 'base64').toString('utf-8').split(':')[0]);
        let order: DeepOrder[];
        if (req.query.date && !isNaN(new Date(String(req.query.date)).getTime())) {
            let date = new Date(String(req.query.date));
            order = await Promise.all((await Order.getForDayAndUser(date, user)).map(async (v) => await v.getDeep()));
        } else {
            order = await Promise.all((await user.getOrders()).map(async (v) => await v.getDeep()));
        }
        res.send({ success: true, orders: order });
    }
}

export default new GetOrderRoute();
