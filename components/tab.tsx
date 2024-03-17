export default function Tap({ tabs }: { tabs: string[] }) {
    return (
        <>
            {tabs.map((item, index) => (
                <code key={index} className="relative rounded bg-muted text-muted-foreground px-2 py-1 mx-1">
                    {item}
                </code>
            ))}
        </>

    )
}