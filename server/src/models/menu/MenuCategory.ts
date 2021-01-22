import Database from "../../Database";

class MenuCategory implements Model {
    private constructor(readonly id: number, public name: string) { }

    static get(id: number): Promise<MenuCategory> {
        return new Promise<MenuCategory>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_menu_categories WHERE id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    resolve(new MenuCategory(result[0].id, result[0].name));
                } else {
                    reject(new Error('MenuCategory not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default MenuCategory;