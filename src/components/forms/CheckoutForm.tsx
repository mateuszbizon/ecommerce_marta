"use client"

import { checkoutSchema, CheckoutSchema } from '@/lib/validations/checkoutSchema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import useBasketStore from '@/store/basket'
import { CURRENCY, CURRENCY_VALUE } from '@/constants'
import { useUser } from '@clerk/nextjs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { COUNTRIES } from '@/constants/countries'

type CheckoutFormProps = {
    clientSecret: string;
}

function CheckoutForm({ clientSecret }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useUser()
    const { getGroupedItems, getTotalPrice } = useBasketStore()
    const [stripeError, setStripeError] = useState("")
    const form = useForm<CheckoutSchema>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            country: "",
            street: "",
            postalCode: "",
            city: "",
            phoneNumber: ""
        }
    })

    async function onSubmit(data: CheckoutSchema) {
        if (!stripe || !elements) {
            console.log("No stripe or elements from stripe")
            return
        }

        const res = await fetch("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientSecret,
                shipping: data,
                total: getTotalPrice(),
                currency: CURRENCY,
                amountDiscount: 0,
                products: getGroupedItems().map(item => ({
                    productId: item.product._id,
                    quantity: item.quantity
                })),
                clerkId: user?.id || null,
            }),
        });

        const { orderId } = await res.json();

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success?orderid=${orderId}`,
            },
        })

        if (error && error.message) {
            console.error(error.message)
            setStripeError(error.message)
        }

        console.log(data)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-x-5 gap-y-10">
            <Card className='grow'>
                <p className='bigger-text'>Dane do wysyłki</p>
                <div className='space-y-8'>
                    <div className='grid lg:grid-cols-2 gap-x-5 gap-y-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Imię" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwisko</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nazwisko" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adres email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Adres email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kraj</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Wybierz kraj" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {COUNTRIES.map(item => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ulica</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ulica" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid lg:grid-cols-2 gap-x-5 gap-y-8'>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Miasto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Miasto" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kod pocztowy</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kod pocztowy" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numer telefonu</FormLabel>
                                <FormControl>
                                    <Input placeholder="Numer telefonu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </Card>
            <Card className='w-full lg:w-120 lg:h-fit lg:sticky lg:top-nav-height'>
                <p className='bigger-text'>Płatność</p>
                <p className='flex justify-between bigger-text font-bold'>
                    <span>Suma:</span>
                    <span>
                        {getTotalPrice().toFixed(2)} {CURRENCY_VALUE}
                    </span>
                </p>
                <PaymentElement />
                {stripeError.length > 0 && (
                    <p className='text-destructive'>{stripeError}</p>
                )}
                <Button className='w-full' disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Przetwarzanie" : "Zapłać"}
                </Button>
            </Card>
        </form>
    </Form>
  )
}

export default CheckoutForm