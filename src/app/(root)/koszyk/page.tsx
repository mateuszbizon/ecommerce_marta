"use client"

import AddToBasket from '@/components/basket/AddToBasket'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { CURRENCY_VALUE } from '@/constants'
// import { CheckoutData, createCheckoutSession } from '@/lib/actions/createCheckoutSession'
import { urlFor } from '@/sanity/lib/image'
import useBasketStore from '@/store/basket'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function BasketPage() {
    const { getGroupedItems, getTotalPrice } = useBasketStore()
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)

    if (getGroupedItems().length == 0) {
        return (
            <section className='py-section-padding lg:py-[calc(theme(padding.section-padding)*2)] text-center'>
                <h1 className='heading2 mb-10'>
                    Twój koszyk
                </h1>
                <p className='bigger-text mb-8'>
                    Twój koszyk jest pusty
                </p>
                <Button asChild>
                    <Link href={"/sklep"}>
                        Powrót do sklepu
                    </Link>
                </Button>
            </section>
        )
    }

    // async function handleCheckout() {
    //     if (!isSignedIn) return

    //     setIsLoading(true)

    //     try {
    //         const data: CheckoutData = {
    //             orderNumber: crypto.randomUUID(),
    //             customerName: user?.fullName || "Unknown",
    //             customerEmail: user?.emailAddresses[0].emailAddress || "Unknown",
    //             clerkUserId: user!.id
    //         }

    //         const checkoutUrl = await createCheckoutSession(getGroupedItems(), data)

    //         if (checkoutUrl) {
    //             window.location.href = checkoutUrl
    //         }
    //     } catch (error) {
    //         console.error("Error creating checkout: ", error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

  return (
    <>
        <section className='py-section-padding lg:py-[calc(theme(padding.section-padding)*2)]'>
            <Container>
                <h1 className='heading2 mb-10'>
                    Twój koszyk
                </h1>
                <div className='flex flex-col lg:flex-row gap-8'>
                    <Card className='grow h-fit'>
                        {getGroupedItems().map((item) => (
                            <div key={item.product._id} className='flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0'>
                                <Link
                                    href={`/produkt/${item.product.slug?.current}`}
                                    className='flex items-center flex-1 min-w-0 hover:bg-black/5' 
                                >
                                    <div className='size-20 sm:size-24 shrink-0 mr-4'>
                                        {item.product.image && (
                                            <Image src={urlFor(item.product.image).url()} alt={item.product.name || ""} width={96} height={96} className='size-full rounded object-cover' />
                                        )}
                                    </div>
                                    <div className='min-w-0'>
                                        <h2 className='bigger-text line-clamp-1'>
                                            {item.product.name}
                                        </h2>
                                        <p className='text-sm sm:text-base'>
                                            Cena:{" "}
                                            {((item.product.price || 0) * item.quantity).toFixed(2)}
                                            {" "}
                                            {CURRENCY_VALUE}
                                        </p>
                                    </div>
                                </Link>

                                <div className='shrink-0'>
                                    <AddToBasket product={item.product} />
                                </div>
                            </div>
                        ))}
                    </Card>

                    <Card className='w-full lg:w-80 lg:sticky lg:top-nav-height h-fit order-first lg:order-last'>
                        <h2 className='bigger-text'>
                            Podsumowanie zamówienia
                        </h2>
                        <div className='mt-4 space-y-2'>
                            <p className='flex justify-between'>
                                <span>
                                    Produkty:
                                </span>
                                <span>
                                    {getGroupedItems().reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            </p>
                            <p className='flex justify-between bigger-text font-bold border-t border-foreground pt-2'>
                                <span>Suma:</span>
                                <span>
                                    {getTotalPrice().toFixed(2)} {CURRENCY_VALUE}
                                </span>
                            </p>
                        </div>
                        <Button className='mt-4 w-full' asChild>
                            <Link href={"/checkout"}>
                                Przejdź do płatności
                            </Link>
                        </Button>

                        {/* {isSignedIn ? (
                            <button 
                                className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
                                // onClick={handleCheckout}
                            >
                                {isLoading ? "Processing" : "Checkout"}
                            </button>
                        ) : (
                            <SignInButton mode='modal'>
                                <button className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                    Sign in to checkout
                                </button>
                            </SignInButton>
                        )} */}
                    </Card>
                </div>
            </Container>
        </section>
    </>
  )
}

export default BasketPage