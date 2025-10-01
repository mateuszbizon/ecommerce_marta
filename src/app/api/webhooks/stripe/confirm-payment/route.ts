import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const body = await req.text()

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(paymentIntent)

      // przykładowe dane
      const shipping = paymentIntent.shipping

    //   await writeClient.create({
    //     _type: "order",
    //     orderNumber: crypto.randomUUID(),
    //     stripePaymentIntentId: paymentIntent.id,
    //     totalPrice: paymentIntent.amount / 100,
    //     currency: paymentIntent.currency,
    //     status: "paid",
    //     customerName: shipping?.name,
    //     customerEmail: paymentIntent.receipt_email,
    //     customerCountry: shipping?.address?.country,
    //     customerStreet: shipping?.address?.line1,
    //     customerPostalCode: shipping?.address?.postal_code,
    //     customerCity: shipping?.address?.city,
    //     customerPhoneNumber: shipping?.phone,
    //     orderDate: new Date().toISOString(),
    //     products: [], // możesz podać z koszyka
    //   })
    }

    return NextResponse.json({ received: "Webhook received" })
  } catch (err: any) {
    console.error("Webhook error", err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
