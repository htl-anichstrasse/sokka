import Database from "../Database";

class User implements Model {
    constructor(readonly id: number, public email: string, public verified: boolean, public group_id: number, public password: string, readonly timestamp: number) { }

    static create(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_users (email, pwhash) VALUES (?, ?);`, [email, password]).then((result) => {
                resolve(new User(result.insertId, email, false, 1, password, new Date().getTime()));
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
                    resolve(new User(result[0].id, result[0].email, result[0].verified, result[0].group_id, result[0].pwhash, result[0].timestamp));
                } else {
                    reject(new Error('User not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    static getByEmail(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users WHERE email = ?;', [email]).then((result) => {
                if (result.length > 0) {
                    resolve(new User(result[0].id, result[0].email, result[0].verified, result[0].group_id, result[0].pwhash, result[0].timestamp));
                } else {
                    reject(new Error('User not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    static getAll(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users;').then((result) => {
                let users = [];
                for (let user of result) {
                    users.push(new User(user.id, user.email, user.verified, user.group_id, user.pwhash, user.timestamp));
                }
                resolve(users);
            }).catch((err) => reject(err));
        });
    }

    update(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('UPDATE sokka_users SET email = ?, verified = ?, group_id = ?, pwhash = ? WHERE id = ?;', [this.email, this.verified, this.group_id, this.password, this.id]).then(() => {
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