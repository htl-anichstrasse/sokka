import Database from "../Database";
import Group from "./Group";

class User implements Model {
    private constructor(public id: number, public email: string, public verified: boolean, public group: Group, public password: string) { }

    static create(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_users (email, pwhash) VALUES (?, ?);`, [email, password]).then((result) => {
                resolve(new User(result.insertId, email, false, Group.defaultGroup, password));
            }).catch((err) => reject(err));
        });
    }

    static exists(email: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve) => {
            Database.instance.query('SELECT id FROM sokka_users WHERE email = ?;', [email]).then((result) => {
                resolve(result.length > 0);
            });
        });
    }

    static getById(id: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users WHERE id = ?;', [id]).then((result) => {
                if (result.length > 0) {
                    Group.getById(result[0].group_id).then((group) => {
                        resolve(new User(result[0].id, result[0].email, result[0].verified, group, result[0].pwhash));
                    }).catch((err) => reject(err));
                } else {
                    reject('User not found');
                }
            }).catch((err) => reject(err));
        });
    }

    static getByEmail(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users WHERE email = ?;', [email]).then((result) => {
                if (result.length > 0) {
                    Group.getById(result[0].group_id).then((group) => {
                        resolve(new User(result[0].id, result[0].email, result[0].verified, group, result[0].pwhash));
                    }).catch((err) => reject(err));
                } else {
                    reject('User not found');
                }
            }).catch((err) => reject(err));
        });
    }

    static getAll(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users AS su INNER JOIN sokka_groups AS sg ON su.group_id = sg.group_id;').then((result) => {
                resolve(result);
            }).catch((err) => reject(err));
        });
    }

    update(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('UPDATE sokka_users SET email = ?, verified = ?, group_id = ?, pwhash = ? WHERE id = ?;', [this.email, this.verified, this.group.id, this.password, this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_users WHERE id = ?;', [this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default User;