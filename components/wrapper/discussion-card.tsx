import DiscussionCard from '@/components/card/discussion/discussion-card'
import discussionService from '@/lib/service/discussion'
import { getLoginUser } from '@/lib/auth/utils'

export default async function DiscussionCardWrapper() {
  const discussion = await discussionService.getAllDiscussions()
  const loginUser = await getLoginUser()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 items-center">
      {discussion.map((item, index) => (
        <DiscussionCard key={index} loginUser={loginUser} discussion={item} />
      ))}
    </div>
  )
}
