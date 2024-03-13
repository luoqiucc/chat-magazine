import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import LoginForm from '@/components/form/login-form'

export default async function Login() {
    const session = await auth()

    if (session) {
        redirect('/')
    }

    return <LoginForm />
}