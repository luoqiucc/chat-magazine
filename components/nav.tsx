'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

interface NavProps {
    links: {
        href: string
        title: string
        icon: LucideIcon
    }[]
}

export default function Nav({ links }: NavProps) {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const pathname = usePathname()

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        function handleResize(): void {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            {windowWidth < 768 ? (
                <div className="flex flex-col space-y-2">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "icon" }),
                                item.href === pathname && buttonVariants({ variant: "default", size: "icon" }),
                            )}>
                            <item.icon className="h-4 w-4" />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    {links.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                item.href === pathname && buttonVariants({ variant: "default" }),
                                "justify-start",
                            )}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </>
    )
}