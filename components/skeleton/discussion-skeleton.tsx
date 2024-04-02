import { Skeleton } from '@/components/ui/skeleton'

export default function DiscussionCardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-start">
      <Skelete />
      <Skelete />
      <Skelete />
      <Skelete />
      <Skelete />
    </div>
  )
}

function Skelete() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  )
}
