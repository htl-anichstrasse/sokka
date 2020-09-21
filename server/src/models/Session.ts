import * as crypto from 'crypto';
import Database from "../Database";
import User from "./User";

class Session implements Model {
    private constructor(readonly id: number, readonly user_id: number, readonly token: string) { }

    public static create(user: User): Promise<Session> {
        // TODO: token has unique index, there is a VERY SMALL chance that this will fail -> loop
        return new Promise<Session>((resolve, reject) => {
            let token = crypto.randomBytes(16).toString('base64');
            Database.instance.query('INSERT INTO sokka_sessions (user_id, token) VALUES (?, ?);', [user.id, token]).then((result) => {
                resolve(new Session(result.insertId, user.id, token));
            }).catch((err) => reject(err));
        });
    }

    public delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_sessions WHERE id = ?;', [this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default Session;