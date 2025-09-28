"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import useBasketStore from '@/store/basket'

function Basket() {
    const { getAllItemsQuantity } = useBasketStore()
    const allItemsQuantity = getAllItemsQuantity()

  return (
    <Button size={"icon"} variant={"link"} className='text-foreground hover:text-primary relative' asChild>
        <Link href={"/koszyk"}>
            <ShoppingCart className='size-6' />
            {allItemsQuantity > 0 && (
                <div className='absolute -top-2 -right-2 flex justify-center items-center size-5 rounded-full bg-destructive text-xs '>
                    <span>{allItemsQuantity}</span>
                </div>
            )}
        </Link>
    </Button>
  )
}

export default Basket