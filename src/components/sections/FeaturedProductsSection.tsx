import React, { Suspense } from 'react'
import Container from '../ui/container'
import FeaturedProducts from '../products/FeaturedProducts'

function FeaturedProductsSection() {
  return (
    <section className='py-section-padding'>
        <Container>
            <h2 className='heading2 text-center heading-margin-bottom'>Wyróżnione produkty</h2>
            <Suspense>
                <FeaturedProducts />
            </Suspense>
        </Container>
    </section>
  )
}

export default FeaturedProductsSection