import Database from "../Database";

class User implements Model {
    constructor(readonly id: number, public email: string, public verified: boolean, public group_id: number, public password: string, readonly timestamp: number) { }

    static async create(email: string, password: string): Promise<User> {
        let result = await Database.instance.query(`INSERT INTO sokka_users (email, pwhash) VALUES (?, ?);`, [email, password]);
        return new User(result.insertId, email, false, 1, password, new Date().getTime());
    }

    static async exists(email: string): Promise<boolean> {
        return (await Database.instance.query('SELECT id FROM sokka_users WHERE email = ?;', [email])).length > 0;
    }

    static async getById(id: number): Promise<User> {
        let result = await Database.instance.query('SELECT * FROM sokka_users WHERE id = ?;', [id]);
        return result.length > 0 ? new User(result[0].id, result[0].email, result[0].verified, result[0].group_id, result[0].pwhash, result[0].timestamp) : null;
    }

    static async getByEmail(email: string): Promise<User> {
        let result = await Database.instance.query('SELECT * FROM sokka_users WHERE email = ?;', [email]);
        return result.length > 0 ? new User(result[0].id, result[0].email, result[0].verified, result[0].group_id, result[0].pwhash, result[0].timestamp) : null;
    }

    static async getAll(): Promise<User[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_users;');
        let users = [];
        for (let user of result) {
            users.push(new User(user.id, user.email, user.verified, user.group_id, user.pwhash, user.timestamp));
        }
        return users;
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_users SET email = ?, verified = ?, group_id = ?, pwhash = ? WHERE id = ?;', [this.email, this.verified, this.group_id, this.password, this.id]);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_users WHERE id = ?;', [this.id]);
    }
}

export default User;