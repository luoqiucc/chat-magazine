'use server'

import { revalidatePath } from 'next/cache'
import userService from '@/lib/service/user'
import { getLoginUser } from '@/lib/auth/utils'
import authService from '@/lib/service/auth'
import settingsService from '@/lib/service/settings'

export async function updateSettingsAction(
    formData: FormData,
) {
    const user = await getLoginUser()

    if (!user.email) {
        return ''
    }

    const loginUser = await userService.getUserByEmail(user.email)

    const auth = {
        permission_name: 'UPDATE_SETTINGS',
        user_id: Number(loginUser[0].id),
    }

    const isAllow = await authService.selectAuthByUserId(auth)

    if (!isAllow) {
        return 'error'
    }

    await settingsService.updateSettingByUid(
        String(formData.get('uid')),
        Number(formData.get('value')),
    )

    revalidatePath('/dashboard/settings')
}