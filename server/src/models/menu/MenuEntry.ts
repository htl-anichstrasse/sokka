import Database from "../../Database";
import Product from "../product/Product";
import MenuTitle from "./MenuTitle";

class MenuEntry implements Model {
    constructor(readonly id, readonly product_id: number, public menu_id: number, public title_id: number) { }

    static async create(product_id: number, menu_id: number, title_id: number): Promise<MenuEntry> {
        let result = await Database.instance.query(`INSERT INTO sokka_menus_products_connector  (product_id, menu_id, title_id) VALUES (?, ?, ?)`, [product_id, menu_id, title_id]);
        return new MenuEntry(result.insertId, product_id, menu_id, title_id);
    }

    static async get(id: number): Promise<MenuEntry> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus_products_connector WHERE id = ?;', [id]);
        if (result.length === 0) {
            throw new Error('MenuEntry not found');
        }
        return new MenuEntry(result[0].id, result[0].product_id, result[0].menu_id, result[0].title_id);
    }

    async getTitle(): Promise<MenuTitle> {
        return MenuTitle.get(this.title_id);
    }

    async getProduct(): Promise<Product> {
        return Product.get(this.product_id);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_menus_products_connector WHERE id = ?;', [this.id]);
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_menus_products_connector SET title_id = ? WHERE id = ?;', [this.title_id, this.id]);
    }
}

export default MenuEntry;
