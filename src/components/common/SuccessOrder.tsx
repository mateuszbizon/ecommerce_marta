"use client"

import React, { useEffect } from 'react'
import Container from '../ui/container'
import { Card } from '../ui/card'
import { Check } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useBasketStore from '@/store/basket'
import { ClerkLoaded, SignedIn} from '@clerk/nextjs'

function SuccessOrder() {
    const searchParams = useSearchParams()
    const { clearBasket, applyCoupon } = useBasketStore()
    const orderId = searchParams.get("orderid")

    useEffect(() => {
        if (orderId) {
            clearBasket()
            applyCoupon(null)
        }
    }, [])

  return (
    <section className='py-section-padding'>
        <Container className='max-w-[1000px]'>
            <Card className='gap-10'>
                <div className='size-18 rounded-full bg-success/50 flex justify-center items-center mx-auto'>
                    <Check className='size-10 text-success-dark' />
                </div>
                <h1 className='heading3 text-center'>Dziękujemy za Twoje zamówienie</h1>
                <p className='bigger-text text-center'>Twoje zamówione zostałe potwierdzone i wkrótce zostanie wysłane</p>
                <div className='flex justify-center flex-wrap gap-5'>
                    <ClerkLoaded>
                        <SignedIn>
                            <Button variant={"success"} asChild>
                                <Link href={"/twoje-zamowienia"}>
                                    Zobacz swoje zamówienia
                                </Link>
                            </Button>
                        </SignedIn>
                    </ClerkLoaded>
                    <Button asChild>
                        <Link href={"/sklep"}>
                            Kontynuuj zakupy
                        </Link>
                    </Button>
                </div>
            </Card>
        </Container>
    </section>
  )
}

export default SuccessOrder