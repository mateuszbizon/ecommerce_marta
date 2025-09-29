import { Product } from '@/sanity/types'
import React from 'react'
import Container from '../ui/container'
import { CURRENCY_VALUE } from '@/constants'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import AddToBasket from '../basket/AddToBasket'

type SingleProductProps = {
    product: Product
}

function SingleProduct({ product }: SingleProductProps) {
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
                            <AddToBasket product={product} />
                        </div>
                    )}
                </div>
            </div>
        </Container>
    </section>
  )
}

export default SingleProduct