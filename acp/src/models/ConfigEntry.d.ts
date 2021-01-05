declare class ConfigEntry {
    configKey: string
    friendlyName: string
    type: 'INTEGER' | 'STRING' | 'TIME'
    configValue: string
}