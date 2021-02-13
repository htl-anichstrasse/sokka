import Database from "../Database";
import User from "./User";

class Group implements Model {
    private constructor(readonly id: number, public name: string, public rebate: number) { }

    static async create(name: string, rebate: number): Promise<Group> {
        let result = await Database.instance.query(`INSERT INTO sokka_groups (groupname, rebate) VALUES (?, ?);`, [name, rebate]);
        return new Group(result.insertId, name, rebate);
    }

    static async getById(id: number): Promise<Group> {
        let result = await Database.instance.query('SELECT * FROM sokka_groups WHERE group_id = ?;', [id]);
        return result.length > 0 ? new Group(result[0].group_id, result[0].groupname, result[0].rebate) : null;
    }

    static async getAll(): Promise<Group[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_groups;');
        let groups = [];
        for (let group of result) {
            groups.push(new Group(group.group_id, group.groupname, group.rebate));
        }
        return groups;
    }

    async getMembers(): Promise<User[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_users WHERE group_id = ?;', [this.id]);
        let users = [];
        for (let user of result) {
            users.push(new User(user.id, user.email, user.verified, user.group_id, user.pwhash, user.timestamp));
        }
        return users;
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_groups SET groupname = ?, rebate = ? WHERE group_id = ?;', [this.name, this.rebate, this.id]);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_groups WHERE group_id = ?;', [this.id]);
    }
}

export default Group;