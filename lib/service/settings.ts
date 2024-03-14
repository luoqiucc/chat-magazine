import query from './index'

const SETTINGS_NAME_FREE_REGISTER = 'FREE_REGISTER'

interface Settings {
    name: 'FREE_REGISTER' | 'NULL'
}
class SettingsService {
    async getSettingByName(setting: Settings) {
        const statements = `SELECT * FROM settings WHERE name = ?`
        const [result] = await query(statements, [setting.name])
        return result
    }
}

export default new SettingsService()