import query from './index'

class MessageService {
    async remove(discussions_id: number) {
        const statements = `DELETE FROM messages WHERE discussions_id = ?`

        await query(statements, [discussions_id])
    }
}

export default new MessageService()