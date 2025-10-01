"use client"

import CheckoutForm from "@/components/forms/CheckoutForm"
import StripeProvider from "@/components/providers/StripeProvider"
import Container from "@/components/ui/container"
import useBasketStore from "@/store/basket"
import { useEffect, useState } from "react"

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("")
  const { getTotalPrice } = useBasketStore()

  useEffect(() => {
    async function createIntent() {
        const res = await fetch("/api/webhooks/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: getTotalPrice()*100,
                currency: "pln",
            }),
        })

        const data = await res.json()

        setClientSecret(data.clientSecret)
    }

    createIntent()
  }, [])

  return (
    <section className="py-section-padding">
        <Container>
            <h1 className="heading2 text-center heading-margin-bottom">Podsumowanie zamówienia</h1>
            {clientSecret ? (
                <StripeProvider clientSecret={clientSecret}>
                    <CheckoutForm clientSecret={clientSecret} />
                </StripeProvider>
            ) : (
                <p>Ładowanie...</p>
            )}
        </Container>
    </section>
  )
}
