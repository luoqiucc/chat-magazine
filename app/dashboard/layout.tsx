import type { Metadata } from 'next'
import DashboardSidebar from '@/components/dashboard-sidebar'
import LoginInfo from '@/components/login-info'

export const metadata: Metadata = {
    title: '控制台',
    description: 'Chat Magazine',
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <DashboardSidebar />
            <div className="main ml-14 md:ml-64">
                <div className="container">
                    {children}
                    <LoginInfo />
                </div>
            </div>
        </>
    )
}