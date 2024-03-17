'use server'

import { revalidatePath } from 'next/cache'
import starService from '@/lib/service/star'
import userService from '@/lib/service/user'
import { getUid } from '@/lib/utils'
import { getLoginUser } from '@/lib/auth/utils'

export async function createStarAction(
    formData: FormData,
) {
    const loginUser = await getLoginUser()
    if (!loginUser.email) {
        return ''
    }

    const user = await userService.getUserByEmail(loginUser.email)

    const star = {
        uid: getUid(),
        nickname: formData.get('nickname')?.toString() || '0',
        description: formData.get('description')?.toString() || '0',
        avatar_url: formData.get('avatar_url')?.toString() || '0',
        user_id: user[0].id,
    }

    await starService.createStar(star)

    revalidatePath('/dashboard/star')
    revalidatePath('/dashboard/editer')
}

export async function deleteStarAction(
    formData: FormData,
) {
    const star = {
        uid: formData.get('uid')?.toString() || '0',
        nickname: '0',
        description: '0',
        avatar_url: '0',
        user_id: 0,
    }

    await starService.deleteStar(star)

    revalidatePath('/dashboard/star')
    revalidatePath('/dashboard/editer')
}