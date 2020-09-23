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

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ACPSession;