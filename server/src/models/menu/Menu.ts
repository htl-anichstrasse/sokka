import Database from "../../Database";
import MenuCategory from "./MenuCategory";
import MenuEntry from "./MenuEntry";

class Menu implements Model {
    protected constructor(readonly id: number, public category_id: number, public name: string, public image_id: string, public price: number) { }

    static async create(category_id: number, name: string, image_id: string, price: number, entries?: MenuEntry[]): Promise<Menu> {
        let result = await Database.instance.query(`INSERT INTO sokka_menus (category_id, name, image_id, price) VALUES (?, ?, ?, ?)`, [category_id, name, image_id, price]);
        let menu = new Menu(result.insertId, category_id, name, image_id, price);
        if (entries && entries.length > 0) {
            for (let i = 0; i < entries.length; i++) {
                entries[i]['menu_id'] = menu.id;
            }
            menu.setEntries(entries);
        }
        return menu;
    }

    static async get(id: number): Promise<MenuWithEntries> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus WHERE id = ?;', [id]);
        if (result.length === 0) {
            throw new Error('Menu not found');
        }
        let menu = new Menu(result[0].id, result[0].category_id, result[0].name, result[0].image_id, result[0].price);
        let entries = await menu.getEntries();
        return new MenuWithEntries(menu.id, menu.category_id, menu.name, menu.image_id, menu.price, entries);
    }

    static async getAll(): Promise<MenuWithEntries[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus;');
        let menus = [];
        for (let menu of result) {
            let menuObj = new Menu(menu.id, menu.category_id, menu.name, menu.image_id, menu.price);
            let entries = await menuObj.getEntries();
            menus.push(new MenuWithEntries(menuObj.id, menuObj.category_id, menuObj.name, menuObj.image_id, menuObj.price, entries));
        }
        return menus;
    }

    async getEntries(): Promise<MenuEntry[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menus_products_connector WHERE menu_id = ?;', [this.id]);
        let entries = [];
        for (let entry of result) {
            entries.push(new MenuEntry(entry.id, entry.product_id, entry.menu_id, entry.title_id));
        }
        return entries;
    }

    async setEntries(menuEntries: { id?: number, product_id: number, menu_id: number, title_id: number }[]): Promise<void> {
        // Delete old entries
        for (let entry of await this.getEntries()) {
            if (!menuEntries.some((e) => e.id === entry.id)) {
                entry.delete(); // entry was deleted, remove from database
            }
        }
        for (let entry of menuEntries) {
            if (entry.id) {
                // Update entries
                try {
                    let menuEntry = await MenuEntry.get(entry.id);
                    menuEntry.title_id = entry.title_id;
                    await menuEntry.update();
                } catch (err) { }
            } else {
                // Create new entries
                await MenuEntry.create(entry.product_id, entry.menu_id, entry.title_id);
            }
        }
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

class MenuWithEntries extends Menu {
    constructor(readonly id: number, public category_id: number, public name: string, public image_id: string, public price: number, public entries: MenuEntry[]) {
        super(id, category_id, name, image_id, price);
    }
}

export default Menu;
