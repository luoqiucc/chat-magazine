import type { Metadata } from 'next'
import Sidebar from '@/components/sidebar'
import LoginInfo from '@/components/login-info'

export const metadata: Metadata = {
    title: 'Chat Magazine',
    description: 'Chat Magazine',
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Sidebar />
            <div className="main ml-14 md:ml-64">
                <div className="container">
                    {children}
                    <LoginInfo />
                </div>
            </div>
        </>
    )
}