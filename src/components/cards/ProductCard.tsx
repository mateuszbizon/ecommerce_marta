import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

type ProductCardProps = {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='bg-background rounded-2xl border overflow-hidden py-5'>
        {product.image && (
            <figure className='relative w-full aspect-video'>
                <Image src={urlFor(product.image).url()} alt={product.name || ""} fill className='object-contain' />
            </figure>
        )}
        <div className='p-5 pb-0 flex flex-col text-center gap-5'>
            <h3 className='bigger-text'>{product.name}</h3>
            <p className='heading3'>{product.price?.toFixed(2)} zł</p>
            <Button variant={"destructive"}>
                Wybieram
            </Button>
        </div>
    </div>
  )
}

export default ProductCard