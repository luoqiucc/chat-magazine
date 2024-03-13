import {
    Card,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { User, ThumbsUp, MessageCircle, UserCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreateCommentForm } from '@/components/form/comment-form'
import { CreateLikesForm, RemoveLikesForm } from '@/components/form/likes-form'

interface MessageCardProp {
    messages: {
        star: {
            nickname: string
            avatar_url: string
        }
        content: string
        uid: string
    }[]
}

interface CommentCardProp {
    comments: {
        user: {
            name: string
            email: string
        },
        content: string
        uid: string
    }[]
}

interface Discussion {
    uid: string
    title: string
    description: string
    author: string
    likes: string[]
}

interface LoginUser {
    name: string | null,
    email: string | null
}

interface DiscussionCardProp {
    loginUser: LoginUser
    discussion: Discussion & CommentCardProp & MessageCardProp
}

export default function DiscussionCard({ loginUser, discussion }: DiscussionCardProp) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4">
                <MessageCard messages={discussion.messages} />
                {discussion.description !== '' && (
                    <blockquote className="border-l-2 pl-6 mt-6 mx-6 text-muted-foreground italic">
                        " {discussion.description} "
                    </blockquote>
                )}
            </CardContent>
            <CardFooter className="p-4 py-2 space-x-6 bg-secondary items-center">
                <div className="flex items-center">
                    {discussion.likes.some((item) => {
                        return item.email === loginUser.email
                    }) ? (
                        <RemoveLikesForm count={discussion.likes.length} uid={discussion.uid} />
                    ) : (
                        <CreateLikesForm count={discussion.likes.length} uid={discussion.uid} />
                    )}
                </div>
                <Dialog>
                    <DialogTrigger>
                        <div className="flex items-center">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {discussion.comments.length}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="mb-6">评论</DialogTitle>
                            <div className="space-y-20">
                                <CreateCommentForm uid={discussion.uid} />
                                <CommentCard comments={discussion.comments} />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <p className="text-sm text-muted-foreground">
                    @{discussion.author}
                </p>
            </CardFooter>
        </Card>
    )
}

function CommentCard({ comments }: CommentCardProp) {
    return (
        <div className="space-y-6">
            {comments?.map((item, index) => (
                <div className="flex" key={index}>
                    <Avatar className="w-8 h-8 mr-2">
                        <AvatarFallback className="p-2">
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-muted-foreground tracking-tight">
                            {item.user.name}
                        </div>
                        <div className="text-foreground text-left">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function MessageCard({ messages }: MessageCardProp) {
    let nickname = ''
    let flag = false

    return (
        <div className="space-y-2">
            {messages?.map((item, index) => {
                if (item.star.nickname !== nickname) {
                    nickname = item.star.nickname
                    flag = !flag
                }

                return (
                    <section key={index}>
                        {flag ? (
                            <div className="flex">
                                <div
                                    className="
                                        flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 mx-2 py-2 text-sm 
                                        ml-auto bg-primary text-primary-foreground">
                                    {item.content}
                                </div>
                                <Avatar className="w-8 h-8">
                                    {item.star.avatar_url !== '0' && <AvatarImage src={item.star.avatar_url} />}
                                    <AvatarFallback className="p-2">
                                        <UserCheck />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        ) : (
                            <div className="flex">
                                <Avatar className="w-8 h-8">
                                    {item.star.avatar_url !== '0' && <AvatarImage src={item.star.avatar_url} />}
                                    <AvatarFallback className="p-2">
                                        <User />
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className="
                                        flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 mx-2 py-2 text-sm 
                                        bg-muted">
                                    {item.content}
                                </div>
                            </div>
                        )}
                    </section>
                )
            })}
        </div>
    )
}