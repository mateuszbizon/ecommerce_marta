import LoadingMain from '@/components/messages/LoadingMain'
import AllProducts from '@/components/products/AllProducts'
import Container from '@/components/ui/container'
import React, { Suspense } from 'react'

function ShopPage() {
  return (
    <>
        <section className='py-section-padding'>
            <Container>
                <h1 className='heading2 text-center heading-margin-bottom'>Produkty</h1>
                <Suspense fallback={<LoadingMain title='Ładowanie produktów' />}>
                    <AllProducts />
                </Suspense>
            </Container>
        </section>
    </>
  )
}

export default ShopPage