import Database from "../../Database";
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

    static async create(user_id: number): Promise<Order> {
        let result = await Database.instance.query(`INSERT INTO sokka_orders (user_id) VALUES (?)`, [user_id]);
        return new Order(result.insertId, user_id, new Date().getTime(), 'VALID');
    }

    async getDeep(): Promise<DeepOrder> {
        let menuOrders;
        try {
            menuOrders = await Promise.all((await MenuOrder.get(this.id)).map(async (v) => await v.getDeep()));
        } catch (e) {
            menuOrders = [];
        }
        let productOrders;
        try {
            productOrders = await Promise.all((await ProductOrder.get(this.id)).map(async (v) => await v.getDeep()));
        } catch (e) {
            productOrders = [];
        }
        return new DeepOrder(this.id, this.user_id, this.timestamp, this.state, menuOrders, productOrders);
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class DeepOrder extends Order {
    constructor(readonly id: number, readonly user_id: number, readonly timestamp: number, readonly state: 'VALID' | 'INVALIDATED', readonly menuOrders: DeepMenuOrder[], readonly productOrders: DeepProductOrder[]) {
        super(id, user_id, timestamp, state);
    }
}

export default Order;
