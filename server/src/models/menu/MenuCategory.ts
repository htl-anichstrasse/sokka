import Database from "../../Database";

class MenuCategory implements Model {
    private constructor(readonly id: number, public name: string) { }

    static async get(id: number): Promise<MenuCategory> {
        let result = await Database.instance.query('SELECT * FROM sokka_menu_categories WHERE id = ?;', [id]);
        return result.length > 0 ? new MenuCategory(result[0].id, result[0].name) : null;
    }

    static async getAll(): Promise<MenuCategory[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_menu_categories;');
        let menuCategories = [];
        for (let menuCategory of result) {
            menuCategories.push(new MenuCategory(menuCategory.id, menuCategory.name));
        }
        return menuCategories;
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default MenuCategory;