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
import { Spinner } from '../ui/spinner'
import InpostWidget from './InpostWidget'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { getShippingInfo } from '@/lib/utils'
import RequireStar from '../ui/require-star'

type CheckoutFormProps = {
    clientSecret: string;
}

function CheckoutForm({ clientSecret }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useUser()
    const { getGroupedItems, getTotalPrice, appliedCoupon } = useBasketStore()
    const [stripeError, setStripeError] = useState("")
    const [selectedLocker, setSelectedLocker] = useState(null)
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
            phoneNumber: "",
            deliveryMethod: undefined,
        }
    })
    const deliveryMethod = form.watch("deliveryMethod")

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
                total: Number((getTotalPrice() + getShippingInfo(deliveryMethod).price).toFixed(2)),
                currency: CURRENCY,
                amountDiscount: appliedCoupon ? appliedCoupon.amountDiscount : 0,
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
            <div className='grow space-y-10'>
                <Card>
                    <p className='bigger-text'>Dane do wysyłki</p>
                    <div className='space-y-8'>
                        <div className='grid lg:grid-cols-2 gap-x-5 gap-y-8'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imię <RequireStar /></FormLabel>
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
                                        <FormLabel>Nazwisko <RequireStar /></FormLabel>
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
                                    <FormLabel>Adres email <RequireStar /></FormLabel>
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
                                    <FormLabel>Kraj <RequireStar /></FormLabel>
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
                                    <FormLabel>Ulica <RequireStar /></FormLabel>
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
                                        <FormLabel>Miasto <RequireStar /></FormLabel>
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
                                        <FormLabel>Kod pocztowy <RequireStar /></FormLabel>
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
                                    <FormLabel>Numer telefonu <RequireStar /></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Numer telefonu" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Card>
                <Card>
                    <p className='bigger-text'>Wysyłka</p>
                    <FormField
                        control={form.control}
                        name="deliveryMethod"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Metoda wysyłki <RequireStar /></FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="courier" id="courier" />
                                            <FormLabel htmlFor="courier">Kurier DPD – {getShippingInfo("courier").price} {CURRENCY_VALUE}</FormLabel>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="inpost" id="inpost" />
                                            <FormLabel htmlFor="inpost">InPost Paczkomat – {getShippingInfo("inpost").price} {CURRENCY_VALUE}</FormLabel>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="inpost-courier" id="inpost-courier" />
                                            <FormLabel htmlFor="inpost-courier">InPost Kurier – {getShippingInfo("inpost-courier").price} {CURRENCY_VALUE}</FormLabel>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="own" id="own" />
                                            <FormLabel htmlFor="own">Odbiór własny</FormLabel>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* {deliveryMethod === "inpost" && (
                        <FormField
                            control={form.control}
                            name="inpostLocker"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wybierz paczkomat</FormLabel>
                                    <FormControl>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Wybierz punkt odbioru z mapy poniżej:
                                            </p>
                                            <InpostWidget
                                                token={process.env.NEXT_PUBLIC_INPOST_GEO_TOKEN!}
                                                onSelect={(point) => field.onChange(point.name)}
                                            />
                                            {field.value && (
                                                <p className="mt-2 text-sm font-medium">
                                                    Wybrany paczkomat: {field.value.name}
                                                </p>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )} */}
                </Card>
            </div>
            <Card className='w-full lg:w-120 lg:h-fit lg:sticky lg:top-nav-height'>
                <p className='bigger-text'>Płatność</p>
                <p className='flex justify-between bigger-text font-bold'>
                    <span>Suma:</span>
                    <span>
                        {(getTotalPrice() + getShippingInfo(deliveryMethod).price).toFixed(2)} {CURRENCY_VALUE}
                    </span>
                </p>
                <PaymentElement />
                {stripeError.length > 0 && (
                    <p className='text-destructive'>{stripeError}</p>
                )}
                <Button className='w-full' disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            Przetwarzanie <Spinner />
                        </>
                    ) : "Zapłać"}
                </Button>
            </Card>
        </form>
    </Form>
  )
}

export default CheckoutForm