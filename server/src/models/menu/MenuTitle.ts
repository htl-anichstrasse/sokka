import Database from "../../Database";

class MenuTitle implements Model {
    private constructor(readonly id: number, public name: string) { }

    static get(id: number): Promise<MenuTitle> {
        return new Promise<MenuTitle>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_menu_titles WHERE id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    resolve(new MenuTitle(result[0].id, result[0].name));
                } else {
                    reject(new Error('MenuTitle not found'));
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

export default MenuTitle;