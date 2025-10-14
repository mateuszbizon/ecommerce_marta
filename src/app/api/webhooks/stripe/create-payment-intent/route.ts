import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { amount, currency } = body

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // np. w groszach -> 1000 = 10.00 PLN
      currency,
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
