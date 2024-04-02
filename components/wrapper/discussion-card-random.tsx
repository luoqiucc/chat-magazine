import DiscussionCard from '@/components/card/discussion/discussion-card'
import discussionService from '@/lib/service/discussion'
import { getLoginUser } from '@/lib/auth/utils'

export default async function DiscussionCardRandomWrapper() {
  const discussion = await discussionService.getRandomDiscussions()
  const loginUser = await getLoginUser()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 items-start">
      {discussion.map((item, index) => (
        <DiscussionCard key={index} loginUser={loginUser} discussion={item} />
      ))}
    </div>
  )
}
