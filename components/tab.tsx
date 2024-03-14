export default function Tap({ tabs }: { tabs: string[] }) {
    return (
        <>
            {tabs.map((item, index) => (
                <code key={index} className="relative rounded bg-primary text-primary-foreground px-[0.3rem] py-[0.2rem] mx-1 font-mono text-sm font-semibold">
                    {item}
                </code>
            ))}
        </>

    )
}