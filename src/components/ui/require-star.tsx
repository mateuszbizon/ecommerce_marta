import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'

type RequireStarProps = ComponentProps<"span">

function RequireStar({ className, ...props }: RequireStarProps) {
  return (
    <span className={cn('text-destructive', className)} {...props}>*</span>
  )
}

export default RequireStar