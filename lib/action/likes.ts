'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import likesService from '@/lib/service/likes'
import userService from '@/lib/service/user'
import { getLoginUser } from '@/lib/auth/utils'
import { getUid } from '@/lib/utils'
import { number } from 'zod'

export async function createLikesAction(
    formData: FormData,
) {
    const user = await getLoginUser()

    if (!user.email) {
        return ''
    }

    const loginUser = await userService.getUserByEmail(user.email)

    const likes = {
        uid: getUid(),
        target_uid: String(formData.get('uid')) || '0',
        user_id: Number(loginUser[0].id) || 0,
    }

    await likesService.create(likes)

    revalidatePath('/discussion')
    redirect('/discussion')
}

export async function removeLikesAction(
    formData: FormData,
) {
    const user = await getLoginUser()

    if (!user.email) {
        return ''
    }

    const loginUser = await userService.getUserByEmail(user.email)

    const likes = {
        uid: '0',
        target_uid: String(formData.get('uid')) || '0',
        user_id: Number(loginUser[0].id) || 0,
    }

    await likesService.remove(likes)

    revalidatePath('/discussion')
    redirect('/discussion')
}