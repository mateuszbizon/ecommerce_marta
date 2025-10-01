"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { ReactNode } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function StripeProvider({ children, clientSecret }: { children: ReactNode, clientSecret: string }) {
  if (!clientSecret) return null

  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      {children}
    </Elements>
  )
}

export default StripeProvider