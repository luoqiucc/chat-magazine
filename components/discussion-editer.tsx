'use client'

import { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { Message } from '@/lib/definitions'
import { Send, UserCheck, Delete, Eraser } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button, buttonVariants } from '@/components/ui/button'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { MessageCard } from '@/components/card/discussion/discussion-card'
import { Input } from './ui/input'
import { CreateDisscussionForm } from '@/components/form/disscussion-form'

interface Stars {
    stars: {
        id: string
        uid: string
        nickname: string
        avatar_url: string
    }[]
}

const FormSchema = z.object({
    message: z.string().min(1, {
        message: '内容为空'
    }).max(255, {
        message: '内容过长'
    }),
    star_id: z.string(),
})

export default function DiscussionEditer({ stars }: Stars) {
    const [messages, setMessages] = useState([])
    const [description, setDescription] = useState('')

    function handleDescription(e) {
        setDescription(e.target.value)
    }

    function addMessage(message: Message) {
        messages.push(message)
        setMessages(messages)
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: '',
            star_id: String(stars[0]?.id) || '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const star = stars.filter((item) => String(item.id) === String(data.star_id))
        addMessage({
            star: star[0],
            content: data.message,
            uid: '0',
        })
        form.setValue('message', '')
    }

    async function reset() {
        setMessages([])
    }

    return (
        <div className="space-y-2">
            <Card className="p-2 flex items-end">
                <CreateDisscussionForm handler={reset} title='0' description={description} messages={JSON.stringify(messages)}></CreateDisscussionForm>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <MessageCard messages={messages} />
                    <blockquote className="border-l-2 pl-6 mt-6 mx-6 text-muted-foreground italic">
                        " <Input type="text" placeholder='在这里添加一个描述' onChange={handleDescription} /> "
                    </blockquote>
                </CardContent>
                <CardFooter className="p-4 space-x-2 bg-secondary">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <div className="flex space-x-2">
                                <FormField
                                    control={form.control}
                                    name='message'
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input placeholder='对话内容' {...field} />
                                            </FormControl>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='star_id'
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="添加一个角色" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {stars.map((item, index) => (
                                                        <SelectItem key={index} value={String(item.id)}>{item.nickname}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>

                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-x-2 flex">
                                <span className={buttonVariants({ variant: "destructive" })} onClick={() => setMessages([])}>
                                    <Eraser className="h-4 w-4" />
                                </span>
                                <span className={buttonVariants({ variant: "outline" })} onClick={() => setMessages(messages.slice(0, messages.length - 1))}>
                                    <Delete className="h-4 w-4" />
                                </span>
                                <Button variant="default" type="submit">
                                    <Send className="mr-2 h-4 w-4" />添加
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardFooter>
            </Card>
        </div>
    )
}