'use server'

import { revalidatePath } from 'next/cache'

import userService from '@/lib/service/user'
import disscussionService from '@/lib/service/discussion'
import messageService from '@/lib/service/message'
import commentService from '@/lib/service/comment'
import likesService from '@/lib/service/likes'
import { getUid } from '@/lib/utils'
import { getLoginUser } from '@/lib/auth/utils'

export async function createDisscussionAction(
    formData: FormData,
) {
    const loginUser = await getLoginUser()
    const user = await userService.getUserByEmail(loginUser.email || '')

    // type
    const loginUserId: number = user[0].id

    const discussion = {
        uid: getUid(),
        title: String(formData.get('title')),
        description: String(formData.get('description')),
        user_id: loginUserId
    }

    const discussions = await disscussionService.create(discussion)
    const messages = JSON.parse(String(formData.get('messages')))

    if (!messages.length) {
        return ''
    }
    const formatMessages = messages.map((item) => {
        return {
            uid: getUid(),
            discussions_id: discussions.insertId,
            star_id: item.star.id,
            content: item.content,
            play_order: '0',
        }
    })

    await disscussionService.createMessages(formatMessages)

    revalidatePath('/discussion')
    revalidatePath('/dashboard/discussion')
}

export async function deleteDisscussionAction(
    formData: FormData,
) {
    const discussion = {
        uid: String(formData.get('uid')),
        title: '0',
        description: '0',
        user_id: 0,
    }
    const [{ uid, id }] = await disscussionService.getDiscussionsByUid(discussion)

    await disscussionService.remove({
        uid,
        title: '0',
        description: '0',
        user_id: 0,
    })

    await commentService.removeByUid({
        uid: '',
        content: '',
        target_uid: uid,
        user_id: 0,
    })

    await likesService.removeByUid({
        uid: '',
        target_uid: uid,
        user_id: 0,
    })

    await messageService.remove(id)

    revalidatePath('/discussion')
    revalidatePath('/dashboard/discussion')
}