import query from './index'

interface Star {
    uid: string
    nickname: string
    description: string
    avatar_url: string
    user_id: number
}

const STARS_TABLE = 'stars'

class StarService {
    async getAllStars() {
        const statements = `SELECT * FROM ${STARS_TABLE}`

        const [result] = await query(statements)

        return result
    }

    async createStar(star: Star) {
        const statements = `INSERT INTO ${STARS_TABLE} (uid, nickname, description, avatar_url, user_id) VALUES (?, ?, ?, ?, ?);`

        await query(statements, [
            star.uid,
            star.nickname,
            star.description,
            star.avatar_url,
            star.user_id,
        ])
    }

    async deleteStar(star: Star) {
        const statements = `DELETE FROM ${STARS_TABLE} WHERE uid = ?`
        await query(statements, [star.uid])
    }
}

export default new StarService()