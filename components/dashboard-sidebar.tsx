'use client'

import {
    MessageSquareText,
    Sparkles,
    Gauge,
    Home,
    Settings,
    FilePenLine,
} from 'lucide-react'

import ThemeToggle from '@/components/theme-toggle'
import Nav from '@/components/nav'
const dashboardLinks = [
    {
        href: '/dashboard',
        title: '仪表盘',
        icon: Gauge
    },
    {
        href: '/dashboard/editer',
        title: '讨论编辑器',
        icon: FilePenLine
    },
    {
        href: '/dashboard/star',
        title: '领衔主演',
        icon: Sparkles
    },
    {
        href: '/dashboard/discussion',
        title: '讨论',
        icon: MessageSquareText
    },
    {
        href: '/dashboard/settings',
        title: '应用设置',
        icon: Settings
    },
]

export default function DashboardSidebar() {
    return (
        <div
            className="
                fixed top-0 left-0 
                w-14 md:w-64 h-full 
                border-r border-border">
            <section className="p-2 border-b">
                <Nav links={[
                    {
                        href: '/',
                        title: '前往主界面',
                        icon: Home
                    },
                ]} />
            </section>
            <section className="p-2 border-b">
                <Nav links={dashboardLinks} />
            </section>
            <section className="p-2 border-b">
                <ThemeToggle />
            </section>
        </div>
    )
}