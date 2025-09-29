import ProductCard from '@/components/cards/ProductCard'
import Container from '@/components/ui/container'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import React from 'react'

async function ShopPage() {
    const products = await getAllProducts()

  return (
    <>
        <section className='py-section-padding'>
            <Container>
                <h1 className='heading2 text-center heading-margin-bottom'>Produkty</h1>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </Container>
        </section>
    </>
  )
}

export default ShopPage