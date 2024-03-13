import query from '../index'

class Service {
    async getAllDiscussion() {
        const statements = `
            SELECT 
                discussions.*, 
                users.name AS author 
            FROM 
                discussions 
                LEFT JOIN 
                    users ON discussions.user_id = users.id;`

        const [result] = await query(statements)

        return result
    }

    async getMessageByDiscussionId(id: number[]) {
        const head = `
            SELECT 
                *
            FROM
                messages
                LEFT JOIN
                    stars ON messages.star_id = stars.id
            WHERE 
                discussions_id in `

        let sql = '('
        for (let i = 0; i < id.length; i++) {
            sql += '?,'
        }

        sql = sql.substring(0, sql.length - 1)

        const statements = head + sql + ')'
        const [result] = await query(statements, [...id])

        return result
    }

    async getLikesByDiscussionUid(uid: number[]) {
        const head = `
            SELECT 
                likes.*, users.uid, users.name, users.email
            FROM
                likes
                LEFT JOIN
                    users ON likes.user_id = users.id
            WHERE 
                target_uid in `

        let sql = '('
        for (let i = 0; i < uid.length; i++) {
            sql += '?,'
        }

        sql = sql.substring(0, sql.length - 1)

        const statements = head + sql + ')'
        const [result] = await query(statements, [...uid])

        return result
    }

    async getCommentsByDiscussionUid(uid: number[]) {
        const head = `
            SELECT 
                comments.*, users.uid, users.name, users.email
            FROM
                comments
                LEFT JOIN
                    users ON comments.user_id = users.id
            WHERE 
                target_uid in `

        let sql = '('
        for (let i = 0; i < uid.length; i++) {
            sql += '?,'
        }

        sql = sql.substring(0, sql.length - 1)

        const statements = head + sql + ')'
        const [result] = await query(statements, [...uid])

        return result
    }
}

export default new Service()