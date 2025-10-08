import ErrorMessage from '@/components/messages/ErrorMessage'
import SingleProduct from '@/components/products/SingleProduct'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

async function SingleProductPage({ params }: Props) {
    const slug = (await params).slug
    const { product, message, success } = await getProductBySlug(slug)

    if (!success) return <ErrorMessage description={message} />

    if (!product) return notFound()

  return (
    <>
        <SingleProduct product={product} />
    </>
  )
}

export default SingleProductPage