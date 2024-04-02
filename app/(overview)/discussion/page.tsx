import SectionHeader from '@/components/section-header'
import DiscussionCardWrapper from '@/components/wrapper/discussion-card'
import { Suspense } from 'react'
import DiscussionCardSkeleton from '@/components/skeleton/discussion-skeleton'

export default function Discussion() {
  return (
    <>
      <SectionHeader
        headerInfo={{
          title: '讨论',
          summary: '这里是所有的聊天片段',
        }}
      />
      <Suspense fallback={<DiscussionCardSkeleton />}>
        <DiscussionCardWrapper />
      </Suspense>
    </>
  )
}
