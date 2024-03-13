'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import starService from '@/lib/service/star'
import { getUid } from '@/lib/utils'

export async function createStarAction(
    formData: FormData,
) {
    const star = {
        uid: getUid(),
        nickname: formData.get('nickname')?.toString() || '0',
        description: formData.get('description')?.toString() || '0',
        avatar_url: formData.get('avatar_url')?.toString() || '0',
    }

    await starService.createStar(star)

    revalidatePath('/dashboard/star')
    redirect('/dashboard/star')
}

export async function deleteStarAction(
    formData: FormData,
) {
    const star = {
        uid: formData.get('uid')?.toString() || '0',
        nickname: '0',
        description: '0',
        avatar_url: '0',
    }

    await starService.deleteStar(star)

    revalidatePath('/dashboard/star')
    redirect('/dashboard/star')
}