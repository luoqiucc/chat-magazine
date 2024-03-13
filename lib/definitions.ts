export interface User {
    id: string
    name: string
    email: string
    password: string
}

export interface Message {
    star: {
        nickname: string,
        avatar_url: string
    },
    content: string
    uid: string
}