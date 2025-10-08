import React, { Suspense } from 'react'
import Container from '../ui/container'
import FeaturedProducts from '../products/FeaturedProducts'
import LoadingMain from '../messages/LoadingMain'

function FeaturedProductsSection() {
  return (
    <section className='py-section-padding'>
        <Container>
            <h2 className='heading2 text-center heading-margin-bottom'>Wyróżnione produkty</h2>
            <Suspense fallback={<LoadingMain title='Ładowanie produktów' />}>
                <FeaturedProducts />
            </Suspense>
        </Container>
    </section>
  )
}

export default FeaturedProductsSection