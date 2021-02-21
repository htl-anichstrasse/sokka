import Database from "../../Database";
import ProductCategory from "./ProductCategory";

class Product implements Model {
    constructor(readonly id: number, public category_id: number, public name: string, public image_id: string, public price: number, public hidden: boolean) { }

    static async create(category_id: number, name: string, image_id: string, price: number, hidden: boolean): Promise<Product> {
        let result = await Database.instance.query(`INSERT INTO sokka_products (category_id, name, image_id, price, hidden) VALUES (?, ?, ?, ?, ?)`, [category_id, name, image_id, price, hidden]);
        return new Product(result.insertId, category_id, name, image_id, price, hidden);
    }

    static async get(id: number): Promise<Product> {
        let result = await Database.instance.query('SELECT * FROM sokka_products WHERE id = ?;', [id]);
        if (result.length == 0) {
            throw new Error('Product not found');
        }
        return new Product(result[0].id, result[0].category_id, result[0].name, result[0].image_id, result[0].price, result[0].hidden);
    }

    static async getAll(): Promise<Product[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_products;');
        let products = [];
        for (let product of result) {
            products.push(new Product(product.id, product.category_id, product.name, product.image_id, product.price, product.hidden));
        }
        return products;
    }

    async getCategory(): Promise<ProductCategory> {
        return ProductCategory.get(this.category_id);
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_products SET category_id = ?, name = ?, image_id = ?, price = ?, hidden = ? WHERE id = ?;', [this.category_id, this.name, this.image_id, this.price, this.hidden, this.id]);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_products WHERE id = ?;', [this.id]);
    }
}

export default Product;