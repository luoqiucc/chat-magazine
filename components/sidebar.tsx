'use client'

import { LibraryBig, Home, MessagesSquare } from 'lucide-react'
import ThemeToggle from '@/components/theme-toggle'
import Nav from '@/components/nav'

const links = [
    {
        href: '/',
        title: '首页',
        icon: Home
    },
    {
        href: '/magazine',
        title: '期刊',
        icon: LibraryBig
    },
    {
        href: '/discussion',
        title: '讨论',
        icon: MessagesSquare
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
                <Nav links={links} />
            </section>
            <section className="p-2 border-b">
                <ThemeToggle />
            </section>
        </div>
    )

}