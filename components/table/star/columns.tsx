'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteStarForm } from "@/components/form/star-form"

export type Star = {
    id: string
    uid: string
    nickname: string
    description: string
    avatar_url: string
}

export const columns: ColumnDef<Star>[] = [
    {
        accessorKey: 'nickname',
        header: '昵称',
    },
    {
        accessorKey: 'description',
        header: '描述',
    },
    {
        accessorKey: 'avatar_url',
        header: '头像URL',
    },
    {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => {
            const star = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DeleteStarForm uid={star.uid} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
