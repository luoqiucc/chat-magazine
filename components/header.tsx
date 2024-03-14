import Tab from '@/components/tab'

export default function Header() {
    return (
        <div className="py-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                上海汤臣一品业主交流群<span className="text-muted-foreground">.group</span>
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                这里是上海汤臣一品业主交流群的官方刊物。他收录了群友的金句，发癫，逆天言论，希望你在这里玩的开心。但是请注意，该刊物包含以下内容:
                <Tab tabs={['大喵喵', '草', '先辈', '流汗黄豆', '猫娘']} />
            </p>
        </div>
    )
}