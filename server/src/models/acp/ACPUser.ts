import Database from "../../Database";

class ACPUser implements Model {
    private constructor(readonly name: string, public password: string) { }

    static create(username: string, password: string): Promise<ACPUser> {
        return new Promise<ACPUser>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_acp_users (username, pwhash) VALUES (?, ?)`, [username, password]).then(() => {
                resolve(new ACPUser(username, password));
            }).catch((err) => reject(err));
        });
    }

    static get(username: string): Promise<ACPUser> {
        return new Promise<ACPUser>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_acp_users WHERE username = ?;', [username]).then((result) => {
                if (result.length > 0) {
                    resolve(new ACPUser(result[0].username, result[0].pwhash));
                } else {
                    reject(new Error('ACP user not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    static exists(username: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve) => {
            Database.instance.query('SELECT username FROM sokka_acp_users WHERE username = ?;', [username]).then((result) => {
                resolve(result.length > 0);
            });
        });
    }

    static getAll(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            Database.instance.query('SELECT username FROM sokka_acp_users;').then((result) => {
                resolve(result);
            }).catch((err) => reject(err));
        });
    }

    update(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('UPDATE sokka_acp_users SET password = ? WHERE username = ?;', [this.password, this.name]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_acp_users WHERE username = ?;', [this.name]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default ACPUser;