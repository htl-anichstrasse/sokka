import Database from "../Database";

class Group implements Model {
    public static defaultGroup = new Group(1, "Default", 0);

    private constructor(readonly id: number, readonly groupname: string, readonly rebate: number) { }

    static create(groupname, rebate): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_groups (groupname, rebate) VALUES (?, ?);`, [groupname, rebate]).then((result) => {
                resolve(new Group(result.insertId, groupname, rebate));
            }).catch((err) => reject(err));
        });
    }

    static getById(id: string): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_groups WHERE group_id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    resolve(new Group(result[0].group_id, result[0].groupname, result[0].rebate));
                } else {
                    reject('Group not found');
                }
            }).catch((err) => reject(err));
        });
    }

    static getByName(name: string): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_groups WHERE groupname = ?;', [name]).then((result) => {
                if (result.length > 0) {
                    resolve(new Group(result[0].group_id, result[0].groupname, result[0].rebate));
                } else {
                    reject('Group not found');
                }
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