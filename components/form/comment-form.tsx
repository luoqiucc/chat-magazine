'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { createCommentAction } from '@/lib/action/comment'

const FormSchema = z.object({
    content: z.string().min(1, {
        message: '内容过短'
    }).max(255, {
        message: '内容过长'
    }),
    uid: z.string(),
})

interface createCommentProp {
    uid: string
}

export function CreateCommentForm({ uid }: createCommentProp) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            content: '',
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        formData.append('content', data.content)
        await createCommentAction(formData)
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder='留下你的评论...' {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="float-end" type='submit'>评论</Button>
                </form>
            </Form>
        </div>
    )
}