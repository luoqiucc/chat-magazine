import { getLoginUser } from '@/lib/auth/utils'
import { signOut } from '@/auth'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { User, LogIn, UserX } from 'lucide-react'

export default async function LoginInfo() {
    const loginUser = await getLoginUser()

    return (
        <section className="my-16">
            {loginUser.name ? (
                <Alert className="flex justify-between items-center">
                    <div className="flex">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                            <AlertTitle>Hi, {loginUser.name && (<>{loginUser.name}</>)}</AlertTitle>
                            <AlertDescription>
                                当前已经登录
                            </AlertDescription>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            'use server'
                            await signOut()
                        }}>
                        <Button type="submit" variant="outline" size="icon">
                            <LogIn />
                        </Button>
                    </form>
                </Alert>
            ) : (
                <Alert className="flex justify-between items-center">
                    <div className="flex">
                        <UserX className="h-4 w-4 mr-2" />
                        <div>
                            <AlertTitle>未登录</AlertTitle>
                            <AlertDescription>
                                你还没有登录，网站的部分功能可能会受到限制
                            </AlertDescription>
                        </div>
                    </div>
                    <Link href="/login" className={buttonVariants({ variant: "outline" })}>登录</Link>
                </Alert>
            )}
        </section>
    )
}