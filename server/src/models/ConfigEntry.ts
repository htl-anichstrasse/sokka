import Database from "../Database";

class ConfigEntry implements Model {
    private constructor(readonly key: string, public friendlyName: string, public type: 'INTEGER' | 'STRING' | 'TIME', public value: string) { }

    static async get(key: string): Promise<ConfigEntry> {
        let result = await Database.instance.query('SELECT * FROM sokka_config WHERE configKey = ?;', [key]);
        return result.length > 0 ? new ConfigEntry(result[0].configKey, result[0].friendlyName, result[0].type, result[0].configValue) : null;
    }

    static async getAll(): Promise<ConfigEntry[]> {
        let result = await Database.instance.query('SELECT * FROM sokka_config;');
        let configEntries = [];
        for (let configEntry of result) {
            configEntries.push(new ConfigEntry(configEntry.configKey, configEntry.friendlyName, configEntry.type, configEntry.configValue));
        }
        return configEntries;
    }

    async update(): Promise<void> {
        await Database.instance.query('UPDATE sokka_config SET friendlyName = ?, type = ?, configValue = ? WHERE configKey = ?;', [this.friendlyName, this.type, this.value, this.key]);
    }

    async delete(): Promise<void> {
        await Database.instance.query('DELETE FROM sokka_config WHERE key = ?;', [this.key]);
    }
}

export default ConfigEntry;