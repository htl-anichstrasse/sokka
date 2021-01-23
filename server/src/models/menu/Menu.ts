import Database from "../../Database";
import Product from "../product/Product";
import MenuCategory from "./MenuCategory";
import MenuTitle from "./MenuTitle";

class Menu implements Model {
    private constructor(readonly id: number, public category_id: number, public name: string, public image: Blob, public price: number) { }

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
        await Database.instance.query('UPDATE sokka_menus SET category_id = ?, name = ?, image = ?, price = ? WHERE id = ?;', [this.category_id, this.name, this.image, this.price, this.id]);
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