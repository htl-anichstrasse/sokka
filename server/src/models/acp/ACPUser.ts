import Database from "../../Database";

class ACPUser implements Model {
    private constructor(readonly name: string, public password: string, readonly timestamp: number) { }

    static async create(username: string, password: string): Promise<ACPUser> {
        await Database.instance.query(`INSERT INTO sokka_acp_users (username, pwhash) VALUES (?, ?)`, [username, password]);
        return await new ACPUser(username, password, new Date().getTime());
    }

    static async get(username: string): Promise<ACPUser> {
        let result = await Database.instance.query('SELECT * FROM sokka_acp_users WHERE username = ?;', [username]);
        if (result.length === 0) {
            throw new Error('ACP user not found');
        }
        return new ACPUser(result[0].username, result[0].pwhash, result[0].timestamp);
    }

    static async exists(username: string): Promise<Boolean> {
        return (await Database.instance.query('SELECT username FROM sokka_acp_users WHERE username = ?;', [username])).length > 0;
    }

    static async getAll(): Promise<ACPUser[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_acp_users;');
        let acpUsers = [];
        for (let acpUser of result) {
            acpUsers.push(new ACPUser(acpUser.username, acpUser.pwhash, acpUser.timestamp));
        }
        return acpUsers;
    }

    /**
     * {@inheritdoc}
     */
    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_acp_users SET password = ? WHERE username = ?;', [this.password, this.name]);
    }

    /**
     * {@inheritdoc}
     */
    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_acp_users WHERE username = ?;', [this.name]);
    }
}

export default ACPUser;