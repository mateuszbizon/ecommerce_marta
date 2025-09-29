import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import React from 'react'
import ProductCard from '../cards/ProductCard'

async function AllProducts() {
    const products = await getAllProducts()

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
        {products.map(product => (
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
  )
}

export default AllProducts