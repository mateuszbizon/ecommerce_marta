"use client"

import { Product } from '@/sanity/types'
import React from 'react'
import Container from '../ui/container'
import { CURRENCY_VALUE } from '@/constants'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import useBasketStore from '@/store/basket'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'

type SingleProductProps = {
    product: Product
}

function SingleProduct({ product }: SingleProductProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const productCount = getItemCount(product._id)
    const isOutOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <section className='py-section-padding lg:py-[calc(theme(padding.section-padding)*2)]'>
        <Container>
            <div className='grid lg:grid-cols-2 gap-x-5 gap-y-10'>
                <div>
                    {product.image && (
                        <figure className='relative w-full max-w-[600px] mx-auto aspect-video'>
                            <Image src={urlFor(product.image).url()} alt={product.name || ""} fill className='object-contain' />
                        </figure>
                    )}
                </div>
                <div className='space-y-5'>
                    <h1 className='heading1'>{product.name}</h1>
                    <p className='bigger-text'>{product.description}</p>
                    <p className='heading2'>{product.price} {CURRENCY_VALUE}</p>
                    {isOutOfStock ? (
                        <p className='little-bigger-text uppercase text-destructive font-medium'>Brak w magazynie</p>
                    ) : (
                        <div className='space-y-3'>
                            <p>
                                Zmień ilość produktu poniżej lub {" "}
                                <Button variant={"link"} size={"link"} asChild>
                                    <Link href={"/koszyk"}>
                                        przejdź do koszyka
                                    </Link>
                                </Button>
                            </p>
                            <div className='flex gap-5 items-center'>
                                <Button size={"icon"} onClick={() => removeItem(product._id)} disabled={productCount === 0}>
                                    <Minus />
                                </Button>
                                <span className='bigger-text'>{productCount}</span>
                                <Button size={"icon"} onClick={() => addItem(product)}>
                                    <Plus />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default SingleProduct