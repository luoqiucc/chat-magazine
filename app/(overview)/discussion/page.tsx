import SectionHeader from '@/components/section-header'
import DiscussionCardWrapper from '@/components/wrapper/discussion-card'
import Header from '@/components/header'

export default function Discussion() {
    return (
        <>
            <Header />
            <SectionHeader headerInfo={{
                title: '讨论',
                summary: '这里是所有的聊天片段'
            }} />

            <DiscussionCardWrapper />
        </>
    )
}