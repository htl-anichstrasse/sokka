import Database from "../../Database";
import Product from "../product/Product";
import MenuCategory from "./MenuCategory";
import MenuTitle from "./MenuTitle";

class Menu implements Model {
    private constructor(readonly id: number, public category_id: number, public name: string, public image: Blob, public price: number) { }

    getEntries(): Promise<MenuEntry[]> {
        return new Promise<MenuEntry[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_menus_products_connector WHERE menu_id = ?;', [this.id]).then((result) => {
                let entries = [];
                for (let entry of result) {
                    entries.push(new MenuEntry(entry.id, entry.title_id, entry.menu_id, entry.product_id));
                }
                resolve(entries);
            }).catch((err) => reject(err));
        });
    }

    getCategory(): Promise<MenuCategory> {
        return MenuCategory.get(this.category_id);
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

class MenuEntry {
    constructor(readonly id, readonly title_id: number, readonly menu_id: number, readonly product_id: number) { }

    getTitle(): Promise<MenuTitle> {
        return MenuTitle.get(this.title_id);
    }

    getProduct(): Promise<Product> {
        return Product.get(this.product_id);
    }
}

export { MenuEntry };
export default Menu;