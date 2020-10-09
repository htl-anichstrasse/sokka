import * as crypto from 'crypto';
import config from '../Config';
import Database from "../Database";
import User from "./User";

class Session implements Model {
    private constructor(readonly id: number, readonly user_id: number, readonly token: string) { }

    static create(user: User): Promise<Session> {
        return new Promise<Session>((resolve, reject) => {
            Session.count(user).then((count) => {
                if (count >= parseInt(config.readConfigValueSync('MAX_USER_SESSIONS'))) {
                    reject('Max number of sessions reached');
                    return;
                }
                // TODO: token has unique index, there is a VERY SMALL chance that this will fail -> loop
                let token = crypto.randomBytes(16).toString('base64');
                Database.instance.query('INSERT INTO sokka_sessions (user_id, token) VALUES (?, ?);', [user.id, token]).then((result) => {
                    resolve(new Session(result.insertId, user.id, token));
                }).catch((err) => reject(err));
            });
        });
    }

    static get(token: string): Promise<Session> {
        return new Promise<Session>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_sessions WHERE token = ?;', [token]).then((result) => {
                if (result.length > 0) {
                    resolve(new Session(result[0].id, result[0].user_id, result[0].token));
                } else {
                    reject('Session not found');
                }
            }).catch((err) => reject(err));
        });
    }

    static count(user: User): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            Database.instance.query('SELECT COUNT(id) FROM sokka_sessions WHERE user_id = ?;', [user.id]).then((result) => {
                resolve(result[0]);
            }).catch((err) => reject(err));
        });
    }

    static validate(user: User, token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.instance.query('SELECT id FROM sokka_sessions WHERE user_id = ? AND token = ?;', [user.id, token]).then((result) => {
                resolve(result.length > 0);
            }).catch((err) => reject(err));
        });
    }

    static deleteAll(user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_sessions WHERE user_id = ?;', [user.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_sessions WHERE id = ?;', [this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default Session;