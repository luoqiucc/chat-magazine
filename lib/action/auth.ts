'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'

export async function authenticate(
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return '登录凭证不正确'
                default:
                    return '发生了一些错误'
            }
        }
        throw error
    }
}