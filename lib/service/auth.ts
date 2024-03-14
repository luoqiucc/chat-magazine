import query from './index'

const ROLE_NAME_ROOT = 'ROOT'
const ROLE_NAME_ADMIN = 'ADMIN'
const ROLE_NAME_USER = 'USER'

const PERMISSION_NAME_UPDATE_SETTINGS = 'UPDATE_SETTINGS'
const PERMISSION_NAME_CREATE_USER = 'CREATE_USER'
const PERMISSION_NAME_CREATE_CONTENT = 'CREATE_CONTENT'
const PERMISSION_NAME_UPDATE_CONTENT = 'UPDATE_CONTENT'
const PERMISSION_NAME_AUTH = 'AUTH'

interface Auth {
    user_id: number
    permission_name: 'UPDATE_SETTINGS' | 'CREATE_USER' | 'CREATE_CONTENT' | 'UPDATE_CONTENT' | 'AUTH'
}

class Auth {
    async selectAuthByUserId(auth: Auth) {
        const statements = `
            SELECT 
                permissions.name
            FROM 
                users 
                LEFT JOIN 
                    user_role ON users.id = user_role.user_id
                LEFT JOIN 
                    role_permission ON user_role.role_id=role_permission.role_id
                LEFT JOIN 
                    permissions ON role_permission.permission_id = permissions.id
            WHERE
                users.id = ? and permissions.name = ?;`

        const [result] = await query(statements, [
            auth.user_id,
            auth.permission_name
        ])

        if (result.length) {
            return true
        } else {
            return false
        }
    }

    async getRoleByName(name: 'ROOT' | 'ADMIN' | 'USER') {
        const statements = `SELECT * FROM roles WHERE name = ?`
        const [result] = await query(statements, [name])

        return result
    }

    async addRoot(id: number, uid: string) {
        const role = await this.getRoleByName('ROOT')
        const statements = `INSERT INTO user_role (uid, user_id, role_id) VALUES (?, ?, ?)`

        const [result] = await query(statements, [uid, id, role[0].id])

        return result
    }
}

export default new Auth()