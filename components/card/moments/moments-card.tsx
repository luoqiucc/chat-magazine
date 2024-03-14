import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { CircleUserRound } from 'lucide-react'

export default function MomentsCard() {
    return (
        <Card>
            <CardContent className="p-4">
                <p className="leading-7 [&:not(:first-child)]:mt-6 font-bold">
                    内容内容内容内容内容，内容内容内容内容内容内容内容
                </p>
            </CardContent>
            <CardFooter className="text-muted-foreground p-4">
                <CircleUserRound className="mr-2" /> 落秋cc
            </CardFooter>
        </Card>
    )
}