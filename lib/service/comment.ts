import query from './index'

interface Comment {
    uid: string
    content: string
    target_uid: string
    user_id: string
}
class CommentService {
    async create(comment: Comment) {
        const statements = `INSERT INTO comments (uid, content, target_uid, user_id) VALUES (?, ?, ?, ?)`

        await query(statements, [
            comment.uid,
            comment.content,
            comment.target_uid,
            comment.user_id,
        ])
    }
}

export default new CommentService()