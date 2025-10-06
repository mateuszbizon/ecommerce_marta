import SuccessOrder from '@/components/common/SuccessOrder'
import React, { Suspense } from 'react'

function SuccessPage() {
  return (
    <>
        <Suspense>
            <SuccessOrder />
        </Suspense>
    </>
  )
}

export default SuccessPage