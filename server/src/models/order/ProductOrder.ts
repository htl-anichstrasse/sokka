import Database from "../../Database";
import Product from "../product/Product";

class ProductOrder implements Model {
    protected constructor(readonly order_id: number, readonly product_id: number, readonly quantity: number) { }

    static async get(order_id: number): Promise<ProductOrder[]> {
        let result = await Database.instance.query(`SELECT * FROM sokka_orders_products WHERE order_id = ?;`, order_id);
        if (result.length === 0) {
            throw new Error('ProductOrder not found');
        }
        let productOrders = [];
        for (let productOrder of result) {
            productOrders.push(new ProductOrder(productOrder.id, productOrder.product_id, productOrder.quantity));
        }
        return productOrders;
    }

    async getDeep(): Promise<DeepProductOrder> {
        let product = await Product.get(this.product_id);
        return new DeepProductOrder(this.order_id, product, this.quantity);
    }

    static async create(order_id: number, product_id: number, quantity: number): Promise<ProductOrder> {
        await Database.instance.query(`INSERT INTO sokka_orders_products (order_id, product_id, quantity) VALUES (?, ?, ?)`, [order_id, product_id, quantity]);
        return new ProductOrder(order_id, product_id, quantity);
    }

    async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class DeepProductOrder extends ProductOrder {
    constructor(readonly order_id: number, readonly product: Product, readonly quantity: number) {
        super(order_id, product.id, quantity);
    }
}

export { DeepProductOrder, ProductOrder };
