import SectionHeader from '@/components/section-header'
// import '@/script/init'

export default function Welcome() {
  return (
    <>
      <SectionHeader headerInfo={{
        title: '热门讨论',
        summary: '早上好，牛马'
      }} />

      <SectionHeader headerInfo={{
        title: '最新更新',
        summary: '早上好，牛马'
      }} />

      <SectionHeader headerInfo={{
        title: '最新动态',
        summary: '早上好，牛马'
      }} />
    </>
  )
}
