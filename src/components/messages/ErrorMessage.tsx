import { AlertTriangle } from "lucide-react"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty"

type ErrorMessageProps = {
    title?: string
    description: string
    actions?: React.ReactNode
}

function ErrorMessage({ title = "Wystąpił błąd", description, actions }: ErrorMessageProps) {
  return (
    <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <AlertTriangle className="size-8 text-destructive" />
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

export default ErrorMessage