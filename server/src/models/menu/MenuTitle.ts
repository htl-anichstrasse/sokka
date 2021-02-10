import Database from "../../Database";

class MenuTitle implements Model {
    private constructor(readonly id: number, public name: string) { }

    static async get(id: number): Promise<MenuTitle> {
        let result = await Database.instance.query('SELECT * FROM sokka_menu_titles WHERE id = ?;', [id]);
        return result.length > 0 ? new MenuTitle(result[0].id, result[0].name) : null;
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default MenuTitle;