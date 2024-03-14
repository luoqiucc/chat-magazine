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
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { createDisscussionAction, deleteDisscussionAction } from '@/lib/action/discussion'

interface CreateDisscussionFormProp {
    handler: Function
    title: string
    description: string
    messages: string
}

export function CreateDisscussionForm(
    {
        handler,
        title,
        description,
        messages,
    }: CreateDisscussionFormProp
) {
    async function publish() {
        const formData = new FormData()
        formData.append('title', '0')
        formData.append('description', description)
        formData.append('messages', messages)
        await createDisscussionAction(formData)

        // 重置聊天框的内容
        handler()
    }

    return <Button variant="secondary" onClick={publish}>发布</Button>
}

const deleteDiscussionFormSchema = z.object({
    uid: z.string(),
})
interface DeleteDiscussionForm {
    uid: string
}
export function DeleteDiscussionForm({ uid }: DeleteDiscussionForm) {
    const form = useForm<z.infer<typeof deleteDiscussionFormSchema>>({
        resolver: zodResolver(deleteDiscussionFormSchema),
        defaultValues: {
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof deleteDiscussionFormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        await deleteDisscussionAction(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button
                    className="w-full"
                    type="submit"
                    variant="destructive">
                    删除
                </Button>
            </form>
        </Form>
    )
}