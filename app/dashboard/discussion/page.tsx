import PageHeader from '@/components/page-header'
import DiscussionTableWrapper from '@/components/table/discussion/table'

export default function Discussion() {
    return (
        <>
            <PageHeader headerInfo={{
                title: '管理讨论',
                summary: '在这里管理所有的聊天片段；分组，修改内容或是删除'
            }} />

            <div className="mt-4">
                <DiscussionTableWrapper />
            </div>
        </>
    )
}