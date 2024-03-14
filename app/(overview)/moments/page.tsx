import SectionHeader from '@/components/section-header'

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert'

import { AudioLines } from "lucide-react";

export default function Magazine() {
    return (
        <>
            <SectionHeader headerInfo={{
                title: '动态',
                summary: '看看群友有没有什么新活'
            }} />

            <Alert variant="destructive">
                <AudioLines className="h-4 w-4" />
                <AlertTitle>注意 ！</AlertTitle>
                <AlertDescription>
                    这个功能目前还在开发中...
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-center">
                {/* card wrapper */}
            </div>
        </>
    )
}