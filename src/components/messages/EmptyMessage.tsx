import { Box } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

type EmptyMessageProps = {
    title: string
    description: string
    actions?: React.ReactNode
}

function EmptyMessage({ title, description, actions }: EmptyMessageProps) {
  return (
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <Box className="size-8 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
            <EmptyDescription>
                {description}
            </EmptyDescription>
            {actions && (
                <div className="mt-2 flex justify-center gap-5 flex-wrap">
                    {actions}
                </div>
            )}
        </EmptyContent>
    </Empty>
  )
}

export default EmptyMessage