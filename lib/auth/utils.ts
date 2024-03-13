import { auth } from '@/auth'

interface UserSession {
    name: string | null,
    email: string | null
}
export async function getLoginUser() {
    const session = await auth()
    let user: UserSession = {
        name: null,
        email: null
    }

    if (session) {
        user.name = session.user?.name || null
        user.email = session.user?.email || null
    }

    return user
}