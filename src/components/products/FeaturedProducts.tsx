import React from 'react'
import { getFeaturedProducts } from '@/sanity/lib/products/getFeaturedProducts'
import ProductCard from '../cards/ProductCard'
import ErrorMessage from '../messages/ErrorMessage'

async function FeaturedProducts() {
    const { products, success, message } = await getFeaturedProducts()

    if (!success) return <ErrorMessage description={message} />

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
        {products.map(product => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
  )
}

export default FeaturedProducts