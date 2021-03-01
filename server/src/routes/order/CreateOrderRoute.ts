import { Request, Response, Router } from "express";
import ConfigEntry from "../../models/ConfigEntry";
import { MenuOrder } from "../../models/order/MenuOrder";
import { Order } from "../../models/order/Order";
import { ProductOrder } from "../../models/order/ProductOrder";
import User from "../../models/User";
import Route from "../../Route";
import { AuthorizationType, NeedsAuthorization, NeedsProperties } from "../RouteAnnotations";


class CreateOrderRoute extends Route {
    readonly router: Router;
    readonly path: string;

    constructor() {
        super();
        this.router = Router();
        this.path = '/';
        this.router.post('/order/create', this.post.bind(this));
    }

    @NeedsAuthorization(AuthorizationType.App)
    @NeedsProperties({ products: 'object', menus: 'object' })
    private async post(req: Request, res: Response): Promise<void> {
        let user = await User.getByEmail(Buffer.from(req.token, 'base64').toString('utf-8').split(':')[0]);
        if (user.isBlocked()) {
            res.send({ success: false, message: 'Sorry, you need to verify your account first' });
            return;
        }

        // Check closing time
        let closingTime = (await ConfigEntry.get('closingTime')).value.split(':').map((v) => parseInt(v));
        let curDate = new Date();
        let beforeClosingTime = false;
        if (curDate.getHours() <= closingTime[0]) {
            if (curDate.getHours() === closingTime[0]) {
                if (curDate.getMinutes() < closingTime[1]) {
                    beforeClosingTime = true;
                }
            } else {
                beforeClosingTime = true;
            }
        }
        if (!beforeClosingTime) {
            res.send({ success: false, message: `Ordering is disabled, please try again tomorrow`, timeLimit: closingTime.join(':') });
            return;
        }

        // Sanity checks ...
        let isInvalid = req.body.products.length === 0 && req.body.menus.length === 0;
        if (typeof req.body.products[Symbol.iterator] === 'function') {
            for (let product of req.body.products) {
                isInvalid = Object.keys(product).length !== 2 || !(product.hasOwnProperty('product_id') && product.hasOwnProperty('quantity'));
            }
        }
        if (typeof req.body.menus[Symbol.iterator] === 'function') {
            for (let menu of req.body.menus) {
                isInvalid = Object.keys(menu).length !== 2 || !(menu.hasOwnProperty('menu_id') && menu.hasOwnProperty('quantity'));
            }
        }
        if (isInvalid) {
            res.status(400);
            res.send({ success: false, message: 'Invalid order format' });
            return;
        }

        // Create new order
        let order = await Order.create((await User.getByEmail(Buffer.from(req.token, 'base64').toString('utf-8').split(':')[0])).id);
        for (let product of req.body.products) {
            await ProductOrder.create(order.id, product.product_id, product.quantity);
        }
        for (let menu of req.body.menus) {
            await MenuOrder.create(order.id, menu.menu_id, menu.quantity);
        }
        res.send({ success: true, message: 'Order successfully created' });
    }
}

export default new CreateOrderRoute();
