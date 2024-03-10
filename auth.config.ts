import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    trustHost: true,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth
            const isDashboard = nextUrl.pathname.startsWith('/dashboard')

            if (isDashboard) {
                if (isLoggedIn) {
                    return true
                }
                return false
            }

            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig