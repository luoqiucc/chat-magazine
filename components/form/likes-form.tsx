'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { createLikesAction, removeLikesAction } from '@/lib/action/likes'

const FormSchema = z.object({
    uid: z.string(),
})

interface createLikesProp {
    uid: string
    count: number
}

export function CreateLikesForm({ uid, count }: createLikesProp) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        await createLikesAction(formData)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Button className="p-0" type='submit' variant="ghost">
                        <ThumbsUp className="mr-2 h-4 w-4" /> {count}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export function RemoveLikesForm({ uid, count }: createLikesProp) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        await removeLikesAction(formData)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <Button className="p-0" type='submit' variant="ghost">
                        <ThumbsUp color="red" className="mr-2 h-4 w-4" /> {count}
                    </Button>
                </form>
            </Form>
        </div>
    )
}