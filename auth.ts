import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import userService from '@/lib/service/user'
import { passwordEncoding } from '@/lib/utils'

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({
                    email: z.string().email(),
                    password: z.string().min(6)
                })
                .safeParse(credentials)

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await userService.getUserByEmail(email)

                if (!user.length) {
                    return null
                }

                if (user[0].password === passwordEncoding(password)) {
                    return user[0]
                }

                return null
            }

            return null
        },
    })],
})