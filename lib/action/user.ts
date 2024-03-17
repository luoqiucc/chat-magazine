'use server'

import { redirect } from 'next/navigation'
import settingsService from '@/lib/service/settings'
import userService from '@/lib/service/user'
import authService from '@/lib/service/auth'
import { getLoginUser } from '@/lib/auth/utils'
import { getUid, passwordEncoding } from '@/lib/utils'

export async function registerUserAction(
    formData: FormData
) {
    const loginUser = await getLoginUser()
    const settings = await settingsService.getSettingByName({ name: 'FREE_REGISTER' })
    const freeRegister = Number(settings[0].value) === 1

    if (freeRegister) {
        try {
            const user = await userService.create({
                uid: getUid(),
                name: String(formData.get('name')),
                email: String(formData.get('email')),
                password: passwordEncoding(String(formData.get('password'))),
            })
            await authService.addUserRole(user.insertId, getUid())
        } catch (e) {
            return e.toString()
        }

        redirect('/login')
    } else {
        if (loginUser.email) {
            const user = await userService.getUserByEmail(loginUser.email)
            const auth = {
                user_id: user[0].id,
                permission_name: 'CREATE_USER',
            }
            const isAllow = await authService.selectAuthByUserId(auth)
            if (isAllow) {
                try {
                    const user = await userService.create({
                        uid: getUid(),
                        name: String(formData.get('name')),
                        email: String(formData.get('email')),
                        password: passwordEncoding(String(formData.get('password'))),
                    })
                    await authService.addUserRole(user.insertId, getUid())
                } catch (e) {
                    return e.toString()
                }

                redirect('/login')
            } else {
                return 'error'
            }
        } else {
            const result = await userService.getAll()
            if (!result.length) {
                try {
                    const root = await userService.create({
                        uid: getUid(),
                        name: String(formData.get('name')),
                        email: String(formData.get('email')),
                        password: passwordEncoding(String(formData.get('password'))),
                    })
                    await authService.addRootRole(root.insertId, getUid())
                } catch (e) {
                    return e.toString()
                }

                redirect('/login')
            } else {
                return 'error'
            }
        }
    }
}