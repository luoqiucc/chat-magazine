import { columns } from '@/components/table/star/columns'
import { DataTable } from '@/components/table/data-table'
import starService from '@/lib/service/star'

export default async function TableWrapper() {
    const data = await starService.getAllStars()

    return <DataTable columns={columns} data={data} />
}