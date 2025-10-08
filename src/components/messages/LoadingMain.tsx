import React from 'react'
import { Spinner } from '../ui/spinner'

type LoadingMainProps = {
    title?: string
}

function LoadingMain({ title = "Ładowanie" }: LoadingMainProps) {
  return (
    <div>
        <p className='text-center bigger-text max-w-[800px] mx-auto mb-5'>{title}</p>
        <Spinner className='size-10 mx-auto' />
    </div>
  )
}

export default LoadingMain