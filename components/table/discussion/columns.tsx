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
import { DeleteDiscussionForm } from '@/components/form/disscussion-form'

export type Discussion = {
    id: string
    uid: string
    description: string
    author: string
}

export const columns: ColumnDef<Discussion>[] = [
    {
        accessorKey: 'description',
        header: '描述',
    },
    {
        accessorKey: 'author',
        header: '创建者',
    },
    {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => {
            const discussion = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DeleteDiscussionForm uid={discussion.uid} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
