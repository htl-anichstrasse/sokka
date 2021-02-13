import Database from "../../Database";
import ProductCategory from "./ProductCategory";

class Product implements Model {
    constructor(readonly id: number, public category_id: number, public name: string, public image: Blob, public price: number, public hidden: boolean) { }

    static async create(category_id: number, name: string, image: Blob, price: number, hidden: boolean): Promise<Product> {
        let result = await Database.instance.query(`INSERT INTO sokka_products (category_id, name, image, price, hidden) VALUES (?, ?, ?, ?, ?)`, [name, category_id, image, price, hidden]);
        return new Product(result.insertId, category_id, name, image, price, hidden);
    }

    static async get(id: number): Promise<Product> {
        let result = await Database.instance.query('SELECT * FROM sokka_products WHERE id = ?;', [id]);
        return result.length > 0 ? new Product(result[0].id, result[0].category_id, result[0].name, result[0].image, result[0].price, result[0].hidden) : null;
    }

    static async getAll(): Promise<Product[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_products;');
        let products = [];
        for (let product of result) {
            products.push(new Product(product.id, product.category_id, product.name, product.image, product.price, product.hidden));
        }
        return products;
    }

    async getCategory(): Promise<ProductCategory> {
        return ProductCategory.get(this.category_id);
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_products SET category_id = ?, name = ?, image = ?, price = ?, hidden = ?;', [this.category_id, this.name, this.image, this.price, this.hidden]);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_products WHERE id = ?;', [this.id]);
    }
}

export default Product;