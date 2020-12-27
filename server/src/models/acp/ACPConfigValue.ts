import Database from "../../Database";

class ACPConfigValue implements Model {
    private constructor(readonly configKey: string, public friendlyName: string, public type: 'INTEGER' | 'STRING' | 'TIME', public configValue: string) { }

    static get(configKey: string): Promise<ACPConfigValue> {
        return new Promise<ACPConfigValue>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_config WHERE configKey = ?;', [configKey]).then((result) => {
                resolve(new ACPConfigValue(result[0].configKey, result[0].friendlyName, result[0].type, result[0].configValue));
            }).catch((err) => reject(err));
        });
    }

    static getAll(): Promise<ACPConfigValue[]> {
        return new Promise<ACPConfigValue[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_config;').then((result) => {
                let returnArray = [];
                for (let entry of result) {
                    returnArray.push(new ACPConfigValue(entry.configKey, entry.friendlyName, entry.type, entry.configValue));
                }
                resolve(returnArray);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ACPConfigValue;