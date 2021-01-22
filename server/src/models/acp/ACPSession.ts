import * as crypto from 'crypto';
import config from '../../Config';
import Database from "../../Database";
import ACPUser from "./ACPUser";

class ACPSession implements Model {
    private constructor(readonly id: number, public username: string, public token: string, readonly timestamp: number) { }

    /**
     * Creates a new ACP user session and stores it in the database
     * @param user the ACP user to create the session for
     * @returns the created session
    */
    static async create(user: ACPUser): Promise<ACPSession> {
        let count = await ACPSession.count(user);
        const maxSessions = parseInt(config.readConfigValueSync('MAX_ACP_USER_SESSIONS'));
        if (count > maxSessions) {
            await ACPSession.purge(count - maxSessions);
        }
        let token = crypto.randomBytes(24).toString('base64'); // SHA-1 collisions are very unlikely
        let result = await Database.instance.query('INSERT INTO sokka_acp_sessions (acp_username, token) VALUES (?, ?);', [user.name, token]);
        return new ACPSession(result.insertId, user.name, token, new Date().getTime());
    }

    /**
     * Gets an ACP session for an ACP session token
     * @param token the ACP session token
     * @returns the ACP session for the provided ACP session token
    */
    static async get(token: string): Promise<ACPSession> {
        let result = await Database.instance.query('SELECT * FROM sokka_acp_sessions WHERE token = ?;', [token]);
        return result.length > 0 ? new ACPSession(result[0].id, result[0].acp_username, result[0].token, result[0].timestamp) : null;
    }

    /**
     * Counts the amount of active ACP sessions for an ACP user
     * @param user the ACP user whose ACP sessions will be counted
     * @returns the amount of active ACP sessions for the provided ACP user
     */
    static async count(user: ACPUser): Promise<number> {
        return (Object.values((await Database.instance.query('SELECT COUNT(id) FROM sokka_acp_sessions WHERE acp_username = ?;', [user.name]))[0]) as number[])[0];
    }

    /**
     * Invalidates old ACP sessions, used to make free ACP sessions when MAX_ACP_USER_SESSIONS config value is hit
     * @param count the amount of ACP sessions to be purged
     */
    static async purge(count: number): Promise<void> {
        let ids = (await Database.instance.query('SELECT id FROM sokka_acp_sessions ORDER BY timestamp ASC LIMIT ?;', [count])).map((val) => val.id);
        await Database.instance.query(`DELETE FROM sokka_acp_sessions WHERE id IN (${ids.join(',')});`);
    }

    /**
     * Validates an ACP session token for an ACP user
     * @param user the ACP user to be checked
     * @param token the ACP session token to be checked
     * @returns true, if the provided ACP session token is valid for the provided ACP user, false otherwise
     */
    static async validate(user: ACPUser, token: string): Promise<boolean> {
        return (await Database.instance.query('SELECT id FROM sokka_acp_sessions WHERE acp_username = ? AND token = ?;', [user.name, token])).length > 0;
    }

    /**
     * {@inheritdoc}
     */
    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_acp_session SET acp_username = ?, token = ? WHERE id = ?;', [this.username, this.token, this.id]);
    }

    /**
     * {@inheritdoc}
     */
    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_acp_sessions WHERE id = ?;', [this.id]);
    }
}

export default ACPSession;