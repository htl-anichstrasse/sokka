import { Request, Response, Router } from "express";
import Order from "../../models/order/Order";
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
        if (req.query.id && !isNaN(parseInt(String(req.query.id)))) {
            let order = (await Order.get(parseInt(String(req.query.id)))).getDeep();
            res.send({ success: true, orders: order });
            return;
        }
        let deepOrder = await Promise.all((await user.getOrders()).map(async (v) => await v.getDeep()));
        res.send({ success: true, orders: deepOrder });
    }
}

export default new GetOrderRoute();
