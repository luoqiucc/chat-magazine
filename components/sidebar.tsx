'use client'

import { Home, MessagesSquare, Gauge, UsersRound } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import Nav from '@/components/nav'

const links = [
    // {
    //     href: '/',
    //     title: '首页',
    //     icon: Home
    // },
    {
        href: '/discussion',
        title: '讨论',
        icon: MessagesSquare
    },
    {
        href: '/moments',
        title: '动态',
        icon: UsersRound
    },
]

export default function Sidebar() {
    return (
        <div
            className="
                fixed top-0 left-0 
                w-14 md:w-64 h-full 
                border-r border-border">
            <section className="p-2 border-b">
                <Nav links={[
                    {
                        href: '/dashboard',
                        title: '前往控制台',
                        icon: Gauge
                    }
                ]} />
            </section>
            <section className="p-2 border-b">
                <Nav links={links} />
            </section>
            <section className="p-2 border-b">
                <ThemeToggle />
            </section>
        </div>
    )
}