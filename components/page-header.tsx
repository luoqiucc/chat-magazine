interface PageHeaderProp {
    headerInfo: {
        title: string
        summary: string
    }
}

export default function PageHeader({ headerInfo }: PageHeaderProp) {
    return (
        <div className="border-b border-border py-2 my-2">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
                {headerInfo.title}
            </h3>
            <p className="text-sm text-muted-foreground">
                {headerInfo.summary}
            </p>
        </div>
    )
}