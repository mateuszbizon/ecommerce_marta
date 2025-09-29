"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import useBasketStore from '@/store/basket'
import { Product } from '@/sanity/types'

type AddToBasketProps = {
    product: Product
}

function AddToBasket({ product }: AddToBasketProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const productCount = getItemCount(product._id)

  return (
    <div className='flex gap-5 items-center'>
        <Button size={"icon"} onClick={() => removeItem(product._id)} disabled={productCount === 0}>
            <Minus />
        </Button>
        <span className='bigger-text'>{productCount}</span>
        <Button size={"icon"} onClick={() => addItem(product)}>
            <Plus />
        </Button>
    </div>
  )
}

export default AddToBasket