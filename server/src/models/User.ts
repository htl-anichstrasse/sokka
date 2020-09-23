import Database from "../Database";

class User implements Model {
    private constructor(readonly id: number, readonly email: string, readonly password: string) { }

    static create(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_users (email, pwhash) VALUES (?, ?)`, [email, password]).then((result) => {
                resolve(new User(result.insertId, email, password));
            }).catch((err) => reject(err));
        });
    }

    static exists(email: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve) => {
            Database.instance.query('SELECT id FROM sokka_users WHERE email = ?;', [email]).then((result) => {
                resolve(result > 0);
            });
        });
    }

    static get(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_users WHERE email = ?;', [email]).then((result) => {
                if (result.length > 0) {
                    resolve(new User(result[0].id, result[0].email, result[0].pwhash));
                } else {
                    reject('User not found');
                }
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