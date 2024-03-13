import query from './index'

class UserService {
    async getUserByEmail(email: string) {
        const statements = `SELECT * FROM users WHERE email = ?`

        const [result] = await query(statements, [email])

        return result
    }

    async getAll() {
        const statements = `SELECT * FROM users`

        const [result] = await query(statements)

        return result
    }

    async updateNameByUid(uid: string, name: string) {
        const statements = `
            UPDATE
                users
            SET
                name = ?
            WHERE
                uid = ?;`

        const [result] = await query(statements, [name, uid])

        return result
    }

    async create(
        uid: string,
        name: string,
        email: string,
        password: string) {
        const statements = `
            INSERT INTO users (uid, name, email, password) VALUES (?, ?, ?, ?);`

        const [result] = await query(statements, [uid, name, email, password])

        return result
    }
}

export default new UserService()