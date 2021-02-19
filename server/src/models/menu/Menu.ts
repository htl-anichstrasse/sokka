import Database from "../../Database";
import Product from "../product/Product";
import MenuCategory from "./MenuCategory";
import MenuTitle from "./MenuTitle";

class Menu implements Model {
    private constructor(readonly id: number, public category_id: number, public name: string, public image_id: string, public price: number) { }

    static async create(category_id: number, name: string, image_id: string, price: number) {
        let result = await Database.instance.query(`INSERT INTO sokka_menus (category_id, name, image_id, price) VALUES (?, ?, ?, ?, ?)`, [name, category_id, image_id, price]);
        return new Menu(result.insertId, category_id, name, image_id, price);
    }

    static async get(id: number): Promise<Menu> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus WHERE id = ?;', [id]);
        return result.length > 0 ? new Menu(result[0].id, result[0].category_id, result[0].name, result[0].image_id, result[0].price) : null;
    }

    static async getAll(): Promise<Menu[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus;');
        let menus = [];
        for (let menu of result) {
            menus.push(new Menu(menu.id, menu.category_id, menu.name, menu.image_id, menu.price));
        }
        return menus;
    }

    async getEntries(): Promise<MenuEntry[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus_products_connector WHERE menu_id = ?;', [this.id]);
        let entries = [];
        for (let entry of result) {
            entries.push(new MenuEntry(entry.id, entry.title_id, entry.menu_id, entry.product_id));
        }
        return entries;
    }

    async getCategory(): Promise<MenuCategory> {
        return MenuCategory.get(this.category_id);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_menus WHERE id = ?;', [this.id]);
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_menus SET category_id = ?, name = ?, image_id = ?, price = ? WHERE id = ?;', [this.category_id, this.name, this.image_id, this.price, this.id]);
    }
}

class MenuEntry {
    constructor(readonly id, readonly title_id: number, readonly menu_id: number, readonly product_id: number) { }

    async getTitle(): Promise<MenuTitle> {
        return MenuTitle.get(this.title_id);
    }

    async getProduct(): Promise<Product> {
        return Product.get(this.product_id);
    }
}

export { MenuEntry };
export default Menu;