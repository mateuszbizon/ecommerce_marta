import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type ContainerProps = React.ComponentProps<'div'> & PropsWithChildren

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("w-full max-w-[1400px] mx-auto px-5 h-full", className)} {...props}>
        {children}
    </div>
  )
}

export default Container