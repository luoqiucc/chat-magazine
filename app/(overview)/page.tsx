// import '@/script/init'
import BannerCarousel from '@/components/banner-carousel'
import Header from '@/components/header'
import SectionHeader from '@/components/section-header'
import DiscussionCardRandomWrapper from '@/components/wrapper/discussion-card-random'

export default function Home() {
  return (
    <>
      <Header />
      <BannerCarousel />
      <div className="mt-6">
        <SectionHeader headerInfo={{
          title: '随机',
          summary: '随机讨论'
        }} />
        <DiscussionCardRandomWrapper />
      </div>
      <div className="mt-6">
        <SectionHeader headerInfo={{
          title: '最新动态',
          summary: '新发布的动态'
        }} />
      </div>
    </>
  )
}
