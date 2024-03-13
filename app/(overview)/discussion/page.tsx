import SectionHeader from '@/components/section-header'
import DiscussionCardWrapper from '@/components/wrapper/discussion-card'

export default function Discussion() {
    return (
        <>
            <SectionHeader headerInfo={{
                title: '讨论',
                summary: '这里是所有的聊天片段'
            }} />

            <DiscussionCardWrapper />
        </>
    )
}