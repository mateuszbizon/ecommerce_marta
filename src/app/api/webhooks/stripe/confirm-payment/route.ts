import { sendOrderConfirmation } from "@/lib/emails/orderConfirmEmail"
import { getOrderByPaymentIntent } from "@/sanity/lib/orders/getOrderByPaymentIntent"
import { writeClient } from "@/sanity/lib/writeClient"
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

        let updatedOrder

        if (!paymentIntent.metadata.orderId) {
            const order = await getOrderByPaymentIntent(paymentIntent.id)
            
            if (order?._id) {
                updatedOrder = await writeClient.patch(order._id)
                    .set({ status: "paid" })
                    .commit();
            }
        } else {
            updatedOrder = await writeClient.patch(paymentIntent.metadata.orderId)
                .set({ status: "paid" })
                .commit();
        }

        await sendOrderConfirmation({
            orderNumber: updatedOrder?.orderNumber,
            customerEmail: updatedOrder?.customerEmail,
            customerName: updatedOrder?.customerName,
            total: updatedOrder?.totalPrice
        })
    }

    return NextResponse.json({ received: "Webhook received" })
  } catch (err: any) {
    console.error("Webhook error", err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
}
