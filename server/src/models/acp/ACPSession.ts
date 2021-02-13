import * as bcrypt from 'bcrypt';
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
        let hashedToken = await bcrypt.hash(token, parseInt(await config.readConfigValue('SALT_ROUNDS')));
        let result = await Database.instance.query('INSERT INTO sokka_acp_sessions (acp_username, token) VALUES (?, ?);', [user.name, hashedToken]);
        return new ACPSession(result.insertId, user.name, token, new Date().getTime());
    }

    /**
     * Gets an ACP session for an ACP user and ACP token
     * @param user the ACP user
     * @param token the ACP session token
     * @returns the ACP session for the provided ACP session token
    */
    static async get(user: ACPUser, token: string): Promise<ACPSession> {
        let result = (await Database.instance.query('SELECT * FROM sokka_acp_sessions WHERE acp_username = ?', [user.name]));
        for (let entry of result) {
            let isMatch = await bcrypt.compare(token, entry.token);
            if (isMatch) {
                return new ACPSession(entry.id, entry.acp_username, entry.token, entry.timestamp);
            }
        }
        return null;
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
        let hashes = (await Database.instance.query('SELECT token FROM sokka_acp_sessions WHERE acp_username = ?;', [user.name])).map((rdp) => rdp.token);
        if (hashes.length === 0) {
            return false;
        }
        let callbacks = [];
        for (let hash of hashes) {
            callbacks.push(bcrypt.compare(token, hash));
        }
        return (await Promise.all(callbacks)).some((v) => v === true);
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