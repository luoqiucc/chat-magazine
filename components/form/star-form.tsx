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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { createStarAction, deleteStarAction } from '@/lib/action/star'

const createStarFormSchema = z.object({
    nickname: z.string().min(1, {
        message: '昵称过短'
    }).max(255, {
        message: '内容过长'
    }),
    description: z.string().max(255, {
        message: '内容过长'
    }),
    avatar_url: z.string()
})

export function CreateStarForm() {
    const form = useForm<z.infer<typeof createStarFormSchema>>({
        resolver: zodResolver(createStarFormSchema),
        defaultValues: {
            nickname: '',
            description: '',
            avatar_url: '',
        },
    })

    async function onSubmit(data: z.infer<typeof createStarFormSchema>) {
        const formData = new FormData()
        formData.append('nickname', data.nickname)
        formData.append('description', data.description)
        formData.append('avatar_url', data.avatar_url)
        await createStarAction(formData)
    }

    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>新增</CardTitle>
                    <CardDescription>添加新的角色</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
                            <FormField
                                control={form.control}
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>昵称</FormLabel>
                                        <FormControl>
                                            <Input placeholder="输入角色昵称" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            角色的昵称，可以是其在群聊中的名字
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>简介</FormLabel>
                                        <FormControl>
                                            <Input placeholder="有关该角色的描述" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            一些想要暴露出的信息，广告，或是其真实的QQ/微信号
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatar_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>头像URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://images.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            你可以提供一个在线的图像url来自定义角色的头像，可以使用图床或是GitHub的头像链接
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>新增</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

const deleteStarFormSchema = z.object({
    uid: z.string(),
})

interface DeleteStarForm {
    uid: string
}

export function DeleteStarForm({ uid }: DeleteStarForm) {
    const form = useForm<z.infer<typeof deleteStarFormSchema>>({
        resolver: zodResolver(deleteStarFormSchema),
        defaultValues: {
            uid,
        },
    })

    async function onSubmit(data: z.infer<typeof deleteStarFormSchema>) {
        const formData = new FormData()
        formData.append('uid', data.uid)
        await deleteStarAction(formData)
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