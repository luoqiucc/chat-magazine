import { columns } from '@/components/table/discussion/columns'
import { DataTable } from '@/components/table/data-table'
import discussionService from '@/lib/service/discussion/discussion'

export default async function DiscussionTableWrapper() {
    const data = await discussionService.getAllDiscussion()

    return <DataTable columns={columns} data={data} />
}