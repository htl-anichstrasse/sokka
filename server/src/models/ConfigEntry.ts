import Database from "../Database";

class ConfigEntry implements Model {
    private constructor(readonly key: string, public friendlyName: string, public type: 'INTEGER' | 'STRING' | 'TIME', public value: string) { }

    static get(key: string): Promise<ConfigEntry> {
        return new Promise<ConfigEntry>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_config WHERE configKey = ?;', [key]).then((result) => {
                if (result.length > 0) {
                    resolve(new ConfigEntry(result[0].configKey, result[0].friendlyName, result[0].type, result[0].configValue));
                } else {
                    reject(new Error('Config entry not found'));
                }
            }).catch((err) => reject(err));
        });
    }

    static getAll(): Promise<ConfigEntry[]> {
        return new Promise<ConfigEntry[]>((resolve, reject) => {
            Database.instance.query('SELECT * FROM sokka_config;').then((result) => {
                let returnArray = [];
                for (let entry of result) {
                    returnArray.push(new ConfigEntry(entry.configKey, entry.friendlyName, entry.type, entry.configValue));
                }
                resolve(returnArray);
            }).catch((err) => reject(err));
        });
    }

    update(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Database.instance.query('UPDATE sokka_config SET friendlyName = ?, type = ?, configValue = ? WHERE configKey = ?;', [this.friendlyName, this.type, this.value, this.key]).then(() => {
                resolve(null);
            }).catch((err) => reject(err));
        });
    }

    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default ConfigEntry;