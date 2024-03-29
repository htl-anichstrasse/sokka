import Database from "../../Database";
import Group from "../Group";
import User from "../User";
import { DeepMenuOrder, MenuOrder } from "./MenuOrder";
import { DeepProductOrder, ProductOrder } from "./ProductOrder";

class Order implements Model {
    protected constructor(readonly id: number, readonly user_id: number, readonly timestamp: number, readonly state: 'VALID' | 'INVALIDATED') { }

    static async get(id: number): Promise<Order> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders WHERE id = ?;`, id);
        if (result.length === 0) {
            throw new Error('Order not found');
        }
        return new Order(result[0].id, result[0].user_id, result[0].timestamp, result[0].state);
    }

    static async getForUser(user: User): Promise<Order[]> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders WHERE user_id = ?;`, user.id);
        let orders = [];
        for (let order of result) {
            orders.push(new Order(order.id, order.user_id, order.timestamp, order.state));
        }
        return orders;
    }

    static async getForDay(date: Date): Promise<Order[]> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders WHERE DATE(timestamp) = ?;`, date.toISOString().slice(0, 10));
        let orders = [];
        for (let order of result) {
            orders.push(new Order(order.id, order.user_id, order.timestamp, order.state));
        }
        return orders;
    }

    static async getForDayAndUser(date: Date, user: User): Promise<Order[]> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders WHERE DATE(timestamp) = ? AND user_id = ?;`, [date.toISOString().slice(0, 10), user.id]);
        let orders = [];
        for (let order of result) {
            orders.push(new Order(order.id, order.user_id, order.timestamp, order.state));
        }
        return orders;
    }

    static async create(user_id: number): Promise<Order> {
        let result = await Database.instance.query(`INSERT INTO sokka_orders (user_id) VALUES (?)`, [user_id]);
        return new Order(result.insertId, user_id, new Date().getTime(), 'VALID');
    }

    async getDeep(): Promise<DeepOrder> {
        let menuOrders: DeepMenuOrder[];
        try {
            menuOrders = await Promise.all((await MenuOrder.get(this.id)).map(async (v) => await v.getDeep()));
        } catch (e) {
            menuOrders = [];
        }
        let productOrders: DeepProductOrder[];
        try {
            productOrders = await Promise.all((await ProductOrder.get(this.id)).map(async (v) => await v.getDeep()));
        } catch (e) {
            productOrders = [];
        }
        let rebate;
        try {
            rebate = (await Group.getById((await User.getById(this.user_id)).group_id)).rebate;
        } catch (e) {
            rebate = 0;
        }
        let total = menuOrders.reduce((p1, p2) => p1 + p2.menu.price * p2.quantity, 0) + productOrders.reduce((p1, p2) => p1 + p2.product.price * p2.quantity, 0);
        return new DeepOrder(this.id, this.user_id, this.timestamp, this.state, rebate, total, menuOrders, productOrders);
    }

    async invalidate(): Promise<void> {
        await Database.instance.query('UPDATE sokka_orders SET state = ? WHERE id = ?;', ['INVALIDATED', this.id]);
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class DeepOrder extends Order {
    constructor(readonly id: number, readonly user_id: number, readonly timestamp: number, readonly state: 'VALID' | 'INVALIDATED', readonly rebate: number, readonly total: number, readonly menuOrders: DeepMenuOrder[], readonly productOrders: DeepProductOrder[]) {
        super(id, user_id, timestamp, state);
    }
}

export { DeepOrder, Order };
