import DiscussionEditer from '@/components/discussion-editer'
import starService from '@/lib/service/star'

export default async function DiscussionEditerWrapper() {
    const stars = await starService.getAllStars()

    return (
        <DiscussionEditer stars={stars} />
    )
}