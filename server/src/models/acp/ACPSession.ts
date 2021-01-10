import * as crypto from 'crypto';
import config from '../../Config';
import Database from "../../Database";
import ACPUser from "./ACPUser";

class ACPSession implements Model {
    private constructor(readonly id: number, public acp_username: string, public token: string) { }

    static create(user: ACPUser): Promise<ACPSession> {
        return new Promise<ACPSession>((resolve, reject) => {
            ACPSession.count(user).then((count) => {
                if (count >= parseInt(config.readConfigValueSync('MAX_ACP_USER_SESSIONS'))) {
                    reject(new Error('Max number of sessions reached'));
                    return;
                }
                // TODO: token has unique index, there is a VERY SMALL chance that this will fail -> loop
                let token = crypto.randomBytes(16).toString('base64');
                Database.instance.query('INSERT INTO sokka_acp_sessions (acp_username, token) VALUES (?, ?);', [user.username, token]).then((result) => {
                    resolve(new ACPSession(result.insertId, user.username, token));
                }).catch((err) => reject(err));
            });
        });
    }

    static get(token: string): Promise<ACPSession> {
        return new Promise<ACPSession>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_acp_sessions WHERE token = ?;', [token]).then((result) => {
                if (result.length > 0) {
                    resolve(new ACPSession(result[0].id, result[0].acp_username, result[0].token));
                } else {
                    reject(new Error('ACP Session not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    static count(user: ACPUser): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            Database.instance.query('SELECT COUNT(id) FROM sokka_acp_sessions WHERE acp_username = ?;', [user.username]).then((result) => {
                resolve(result[0]);
            }).catch((err) => reject(err));
        });
    }

    static validate(user: ACPUser, token: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Database.instance.query('SELECT id FROM sokka_acp_sessions WHERE acp_username = ? AND token = ?;', [user.username, token]).then((result) => {
                resolve(result.length > 0);
            }).catch((err) => reject(err));
        });
    }

    update(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('UPDATE sokka_acp_session SET acp_username = ?, token = ? WHERE id = ?;', [this.acp_username, this.token, this.id]).then(() => {
                resolve(null);
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