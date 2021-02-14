import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import config from '../Config';
import Database from "../Database";
import User from "./User";

class Session implements Model {
    private constructor(readonly id: number, public user_id: number, public token: string, readonly timestamp: number) { }

    /**
     * Creates a new user session and stores it in the database
     * @param user the user to create the session for
     * @returns the created session
     */
    static async create(user: User): Promise<Session> {
        let count = await Session.count(user);
        const maxSessions = parseInt(config.readConfigValueSync('MAX_USER_SESSIONS'));
        if (count > maxSessions) {
            await Session.purge(count - maxSessions);
        }
        let token = crypto.randomBytes(24).toString('base64'); // SHA-1 collisions are very unlikely
        let hashedToken = await bcrypt.hash(token, parseInt(await config.readConfigValue('SALT_ROUNDS')));
        let result = await Database.instance.query('INSERT INTO sokka_sessions (user_id, token) VALUES (?, ?);', [user.id, hashedToken]);
        return new Session(result.insertId, user.id, token, new Date().getTime());
    }

    /**
     * Gets a session for a user and session token
     * @param user the user
     * @param token the session token
     * @returns the session for the provided session token
     */
    static async get(user: User, token: string): Promise<Session> {
        let result = await Database.instance.query('SELECT * FROM sokka_sessions WHERE user_id = ?;', [user.id]);
        for (let entry of result) {
            let isMatch = await bcrypt.compare(token, entry.token);
            if (isMatch) {
                return new Session(entry.id, entry.user_id, entry.token, entry.timestamp)
            }
        }
        return null;
    }

    /**
     * Counts the amount of active sessions for a user
     * @param user the user whose sessions will be counted
     * @returns the amount of active sessions for the provided user
     */
    static async count(user: User): Promise<number> {
        return (Object.values((await Database.instance.query('SELECT COUNT(id) FROM sokka_sessions WHERE user_id = ?;', [user.id]))[0]) as number[])[0];
    }

    /**
     * Invalidates old sessions, used to make free sessions when MAX_USER_SESSIONS config value is hit
     * @param count the amount of sessions to be purged
     */
    static async purge(count: number): Promise<void> {
        let ids = (await Database.instance.query('SELECT id FROM sokka_sessions ORDER BY timestamp ASC LIMIT ?;', [count])).map((val) => val.id);
        await Database.instance.query(`DELETE FROM sokka_sessions WHERE id IN (${ids.join(',')});`);
    }

    /**
     * Validates a session token for a user
     * @param user the user to be checked
     * @param token the session token to be checked
     * @returns true, if the provided session token is valid for the provided user, false otherwise
     */
    static async validate(user: User, token: string): Promise<boolean> {
        let hashes = (await Database.instance.query('SELECT token FROM sokka_sessions WHERE user_id = ?;', [user.id])).map((rdp) => rdp.token);
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
        await Database.instance.query('UPDATE sokka_sessions SET user_id = ?, token = ? WHERE id = ?;', [this.user_id, this.token, this.id]);
    }

    /**
     * {@inheritdoc}
     */
    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_sessions WHERE id = ?;', [this.id]);
    }
}

export default Session;