'use client'

import { useState } from 'react'
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

import { registerUserAction } from '@/lib/action/user'
import ErrorTip from '../error-tip'

const FormSchema = z.object({
    email: z.string().email({
        message: '邮箱格式错误',
    }),
    password: z.string().min(6, {
        message: '密码长度需大于6位',
    }),
    name: z.string().min(1, {
        message: '用户名不能为空',
    }),
})

export default function RegisterForm() {
    const [message, setMessage] = useState(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        setMessage(await registerUserAction(formData))
    }

    return (
        <div className="h-[100vh] flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>注册</CardTitle>
                    <CardDescription>在这里注册一个新账户</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className='space-y-4 w-[300px]'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>用户名</FormLabel>
                                        <FormControl>
                                            <Input placeholder='输入你的用户名' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            站点中显示的名称
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>邮箱</FormLabel>
                                        <FormControl>
                                            <Input placeholder='输入你的邮箱' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            后续将用于登录
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='输入你的密码' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            请牢记你的密码
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>注册</Button>
                        </CardFooter>
                    </form>
                </Form>
                {message && <ErrorTip message={message} />}
            </Card>
        </div>
    )
}
