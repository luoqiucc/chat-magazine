import query from './index'

interface Likes {
    uid: string
    target_uid: string
    user_id: number
}

class LikesService {
    async create(likes: Likes) {
        const statements = `INSERT INTO likes (uid, target_uid, user_id) VALUES (?, ?, ?)`

        await query(statements, [
            likes.uid,
            likes.target_uid,
            likes.user_id,
        ])
    }

    async remove(likes: Likes) {
        const statements = `DELETE FROM likes WHERE user_id = ? AND target_uid = ?;`

        await query(statements, [
            likes.user_id,
            likes.target_uid,
        ])
    }

    async removeByUid(likes: Likes) {
        const statements = `DELETE FROM likes WHERE target_uid = ?;`

        await query(statements, [
            likes.target_uid,
        ])
    }
}

export default new LikesService()