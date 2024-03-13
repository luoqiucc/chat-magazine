'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import disscussionService from '@/lib/service/discussion'
import userService from '@/lib/service/user'
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
}

export async function deleteDisscussionAction(
    formData: FormData,
) {

    revalidatePath('/')
}