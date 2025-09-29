import React from 'react'
import { getFeaturedProducts } from '@/sanity/lib/products/getFeaturedProducts'
import ProductCard from '../cards/ProductCard'

async function FeaturedProducts() {
    const featuredProducts = await getFeaturedProducts()

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
        {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
  )
}

export default FeaturedProducts