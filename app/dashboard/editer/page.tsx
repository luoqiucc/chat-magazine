import DiscussionEditerWrapper from '@/components/wrapper/discussion-editer'
import PageHeader from '@/components/page-header'

export default async function Editer() {
    return (
        <>
            <PageHeader headerInfo={{
                title: '讨论编辑器',
                summary: '来创建一个讨论'
            }} />
            <div className="mt-4">
                <DiscussionEditerWrapper />
            </div>
        </>
    )
}