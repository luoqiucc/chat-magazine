'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import commentService from '@/lib/service/comment'
import userService from '@/lib/service/user'
import { getLoginUser } from '@/lib/auth/utils'
import { getUid } from '@/lib/utils'

export async function createCommentAction(
    formData: FormData,
) {
    const user = await getLoginUser()

    if (!user.email) {
        return ''
    }

    const loginUser = await userService.getUserByEmail(user.email)

    const comment = {
        uid: getUid(),
        content: String(formData.get('content')) || '0',
        target_uid: String(formData.get('uid')) || '0',
        user_id: Number(loginUser[0].id) || 0,
    }

    await commentService.create(comment)

    revalidatePath('/discussion')
    redirect('/discussion')
}