import Tab from '@/components/tab'

export default function Header() {
    return (
        <div className="py-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                自定义站点名称<span className="text-muted-foreground">.group</span>
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                站点简介
                <Tab tabs={['标签', '标签']} />
            </p>
        </div>
    )
}