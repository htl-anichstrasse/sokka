import Database from "../../Database";

class ACPUser implements Model {
    private constructor(readonly username: string, readonly password: string) { }

    static get(username: string): Promise<ACPUser> {
        return new Promise<ACPUser>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_acp_users WHERE username = ?;', [username]).then((result) => {
                if (result.length > 0) {
                    resolve(new ACPUser(result[0].username, result[0].pwhash));
                } else {
                    reject('ACP user not found');
                }
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ACPUser;