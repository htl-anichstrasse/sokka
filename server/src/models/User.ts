import Database from "../Database";

class User implements Model {
    private constructor(private id: number, private email: string, private password: string) { }

    public static create(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            Database.instance.query(`INSERT INTO sokka_users (email, pwhash) VALUES (?, ?)`, [email, password]).then((result) => {
                resolve(new User(result.insertId, email, password));
            }).catch((err) => reject(err));
        });
    }

    public delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('').then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }
}

export default User;