"use client"

import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import useBasketStore from '@/store/basket'
import { Check } from 'lucide-react'
import Link from 'next/link'

type ProductCardProps = {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {
    const { addItem, getItemCount } = useBasketStore()
    const productCount = getItemCount(product._id)
    const isProductCountMoreZero = productCount > 0 ? true : false

  return (
    <div className='bg-background rounded-2xl border overflow-hidden py-5'>
        {product.image && (
            <figure className='relative w-full aspect-video'>
                <Image src={urlFor(product.image).url()} alt={product.name || ""} fill className='object-contain' />
            </figure>
        )}
        <div className='p-5 pb-0 flex flex-col text-center gap-5'>
            <p className='bigger-text'>{product.name}</p>
            <p className='heading3'>{product.price?.toFixed(2)} zł</p>
            <Button variant={"destructive"} onClick={() => addItem(product)} disabled={isProductCountMoreZero}>
                {isProductCountMoreZero ? "Dodano do koszyka" : "Wybieram"}
                {isProductCountMoreZero && <Check className='size-5' />}
            </Button>
            <Button variant={"outline"} asChild>
                <Link href={`/produkt/${product.slug?.current}`}>
                    Przejdź do produktu
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default ProductCard