import SingleProduct from '@/components/products/SingleProduct'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

async function SingleProductPage({ params }: Props) {
    const slug = (await params).slug
    const product = await getProductBySlug(slug)

    if (!product) return notFound()

  return (
    <>
        <SingleProduct product={product} />
    </>
  )
}

export default SingleProductPage