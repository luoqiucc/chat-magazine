import query from './index'

const SETTINGS_NAME_FREE_REGISTER = 'FREE_REGISTER'

interface Settings {
    name: 'FREE_REGISTER' | 'NULL'
}
class SettingsService {
    async getAllSetting() {
        const statements = `SELECT * FROM settings`
        const [result] = await query(statements)
        return result
    }

    async getSettingByName(setting: Settings) {
        const statements = `SELECT * FROM settings WHERE name = ?`
        const [result] = await query(statements, [setting.name])
        return result
    }

    async updateSettingByUid(uid: string, value: number) {
        const statements = `UPDATE settings SET value = ? WHERE uid = ?`
        const [result] = await query(statements, [value, uid])
        return result
    }
}

export default new SettingsService()