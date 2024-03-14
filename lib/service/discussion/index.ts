import query from '../index'
import service from './discussion'

interface Discussion {
    uid: string
    title: string
    description: string
    user_id: number
}
interface Messages {
    uid: string
    discussions_id: string
    star_id: number
    content: string
    play_order: number
}
class DiscussionService {
    async create(discussion: Discussion) {
        const statements = `
            INSERT INTO discussions (uid, title, description, user_id) VALUES (?, ?, ?, ?)`

        const [result] = await query(statements, [
            discussion.uid,
            discussion.title,
            discussion.description,
            discussion.user_id
        ])

        return result
    }

    async createMessages(messages: Messages[]) {
        const head = `
            INSERT INTO messages (uid, discussions_id, star_id, content, play_order) VALUES `

        let sqlValue = ''
        let params = []
        for (let i = 0; i < messages.length; i++) {
            sqlValue += `(?, ?, ?, ?, ?),`
            const message = messages[i]
            params.push(
                message.uid,
                message.discussions_id,
                message.star_id,
                message.content,
                i,
            )
        }

        const statements = head + sqlValue.substring(0, sqlValue.length - 1)
        await query(statements, params)
    }

    async remove(discussion: Discussion) {
        const statements = `DELETE FROM discussions WHERE uid = ?`

        await query(statements, [discussion.uid])
    }

    /**
     * ! 这个方法存在一个性能问题，产生这个问题的原因是需要查询的数据分布在多张
     *   表中，这里会先给数据全查出来然后按条件组装。其中messages中的信息会被遍历
     *   多次，具体就是有几条讨论便会遍历几次。我当前用遍历后将符合条件的数据删除
     *   以减少下次遍历时数据量的方式来减轻性能问题(ps.这个对数组内容的操作会不会
     *   让开销更大😅😅😅)
     */
    async getAllDiscussions() {
        const discussions = await service.getAllDiscussion()

        if (discussions.length === 0) {
            return []
        }

        const discussionId = discussions.map((item) => {
            return item = item.id
        })
        const discussionUid = discussions.map((item) => {
            return item = item.uid
        })
        const messages = await service.getMessageByDiscussionId(discussionId)
        const likes = await service.getLikesByDiscussionUid(discussionUid)
        const comments = await service.getCommentsByDiscussionUid(discussionUid)

        const discussionWithAllInfo = discussions.map((item) => {
            const m = this.filterMessageByDiscussionId(messages, item.id)
            const l = this.filterLikesByDiscussionUid(likes, item.uid)
            const c = this.filterCommentByDiscussionUid(comments, item.uid)

            return {
                ...item,
                messages: m,
                comments: c,
                likes: l,
            }
        })

        return discussionWithAllInfo
    }

    async getDiscussionsByUid(discussion: Discussion) {
        const discussions = await service.getDiscussionByUid(discussion.uid)

        const discussionId = discussions.map((item) => {
            return item = item.id
        })
        const discussionUid = discussions.map((item) => {
            return item = item.uid
        })
        const messages = await service.getMessageByDiscussionId(discussionId)
        const likes = await service.getLikesByDiscussionUid(discussionUid)
        const comments = await service.getCommentsByDiscussionUid(discussionUid)

        const discussionWithAllInfo = discussions.map((item) => {
            const m = this.filterMessageByDiscussionId(messages, item.id)
            const l = this.filterLikesByDiscussionUid(likes, item.uid)
            const c = this.filterCommentByDiscussionUid(comments, item.uid)

            return {
                ...item,
                messages: m,
                comments: c,
                likes: l,
            }
        })

        return discussionWithAllInfo
    }

    filterMessageByDiscussionId(messages: number[], discussions_id: number) {
        let result = []
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].discussions_id === discussions_id) {
                messages[i]['star'] = {
                    nickname: messages[i]['nickname'],
                    avatar_url: messages[i]['avatar_url'],
                }
                result.push(messages[i])
            }
        }

        return result
    }

    filterLikesByDiscussionUid(likes: number[], discussions_uid: string) {
        let result = []
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].target_uid === discussions_uid) {
                result.push(likes[i])
            }
        }

        return result
    }

    filterCommentByDiscussionUid(comments: number[], discussions_uid: string) {
        let result = []
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].target_uid === discussions_uid) {
                comments[i]['user'] = {
                    name: comments[i]['name'],
                    email: comments[i]['email'],
                }
                result.push(comments[i])
            }
        }

        return result
    }
}

export default new DiscussionService()