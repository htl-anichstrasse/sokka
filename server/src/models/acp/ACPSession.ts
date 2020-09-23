import * as crypto from 'crypto';
import Database from "../../Database";
import ACPUser from "./ACPUser";

class ACPSession implements Model {
    private constructor(readonly id: number, readonly acp_username: string, readonly token: string) { }

    static create(user: ACPUser): Promise<ACPSession> {
        // TODO: token has unique index, there is a VERY SMALL chance that this will fail -> loop
        return new Promise<ACPSession>((resolve, reject) => {
            let token = crypto.randomBytes(16).toString('base64');
            Database.instance.query('INSERT INTO sokka_acp_sessions (acp_username, token) VALUES (?, ?);', [user.username, token]).then((result) => {
                resolve(new ACPSession(result.insertId, user.username, token));
            }).catch((err) => reject(err));
        });
    }

    static get(token: string): Promise<ACPSession> {
        return new Promise<ACPSession>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_acp_sessions WHERE token = ?;', [token]).then((result) => {
                if (result.length > 0) {
                    resolve(new ACPSession(result[0].id, result[0].acp_username, result[0].token));
                } else {
                    reject('ACP Session not found');
                }
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('DELETE FROM sokka_acp_sessions WHERE id = ?;', [this.id]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default ACPSession;