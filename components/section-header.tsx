interface SectionHeaderProp {
    headerInfo: {
        title: string
        summary: string
    }
}

export default function SectionHeader({ headerInfo }: SectionHeaderProp) {
    return (
        <div className="py-2 my-2">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">
                {headerInfo.title}
            </h4>
            <p className="text-sm text-muted-foreground">
                {headerInfo.summary}
            </p>
        </div>
    )
}