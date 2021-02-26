import Database from "../../Database";
import Menu from "../menu/Menu";

class MenuOrder implements Model {
    protected constructor(readonly order_id: number, readonly menu_id: number, readonly quantity: number) { }

    static async get(order_id: number): Promise<MenuOrder[]> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders_menus WHERE order_id = ?;`, order_id);
        if (result.length === 0) {
            throw new Error('MenuOrder not found');
        }
        let menuOrders = [];
        for (let menuOrder of result) {
            menuOrders.push(new MenuOrder(menuOrder.order_id, menuOrder.menu_id, menuOrder.quantity))
        }
        return menuOrders;
    }

    async getDeep(): Promise<DeepMenuOrder> {
        let menu = await Menu.get(this.menu_id);
        return new DeepMenuOrder(this.order_id, menu, this.quantity);
    }

    static async create(order_id: number, menu_id: number, quantity: number): Promise<MenuOrder> {
        await Database.instance.query(`INSERT INTO sokka_orders_menus (order_id, menu_id, quantity) VALUES (?, ?, ?)`, [order_id, menu_id, quantity]);
        return new MenuOrder(order_id, menu_id, quantity);
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class DeepMenuOrder extends MenuOrder {
    constructor(readonly order_id: number, readonly menu: Menu, readonly quantity: number) {
        super(order_id, menu.id, quantity);
    }
}

export {DeepMenuOrder, MenuOrder};
