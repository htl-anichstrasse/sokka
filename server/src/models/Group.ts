import Database from "../Database";

class Group implements Model {
    private constructor(readonly id: number, readonly groupname: string, readonly rebate: number) { }

    static create(groupname, rebate): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_groups (groupname, rebate) VALUES (?, ?);`, [groupname, rebate]).then((result) => {
                resolve(new Group(result.insertId, groupname, rebate));
            }).catch((err) => reject(err));
        });
    }

    static getAll(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_groups;').then((result) => {
                resolve(result);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_groups WHERE id = ?;', [this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default Group;