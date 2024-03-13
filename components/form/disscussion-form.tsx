'use client'

import { Button } from '@/components/ui/button'
import { createDisscussionAction } from '@/lib/action/discussion'

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