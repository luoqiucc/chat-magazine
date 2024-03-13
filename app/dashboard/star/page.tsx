import { CreateStarForm } from '@/components/form/star-form'

import PageHeader from '@/components/page-header'
import SectionHeader from '@/components/section-header'
import TableWrapper from '@/components/table/star/table'

export default async function Star() {
    return (
        <>
            <PageHeader
                headerInfo={{
                    title: '领衔主演',
                    summary: '在这里管理聊天中所有出场的人物'
                }} />
            <div className="space-y-4 mt-4">
                <CreateStarForm />
                <div>
                    <SectionHeader
                        headerInfo={{
                            title: '所有角色',
                            summary: '在这里调整角色的信息'
                        }} />
                    <TableWrapper />
                </div>
            </div>
        </>
    )
}