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

import { authenticate } from '@/lib/action/auth'
import ErrorTip from '../error-tip'

const FormSchema = z.object({
    email: z.string().email({
        message: '邮箱格式错误',
    }),
    password: z.string().min(6, {
        message: '密码长度需大于6位',
    }),
})

export default function LoginForm() {
    const [message, setMessage] = useState(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: 'luoqiucc@outlook.com',
            password: '123456'
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        setMessage(await authenticate(formData))
    }

    return (
        <div className="h-[100vh] flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>登录</CardTitle>
                    <CardDescription>登录到群刊</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className='space-y-4 w-[300px]'>
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

                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type='submit'>登录</Button>
                        </CardFooter>
                    </form>
                </Form>
                {message && <ErrorTip message={message} />}
            </Card>
        </div>
    )
}
