import { getUserByClerkId } from "@/sanity/lib/users/getUserByClerkId";
import { writeClient } from "@/sanity/lib/writeClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { clientSecret, shipping, total, currency, amountDiscount, products, clerkId } = await req.json();

    let userRef = null;

    if (clerkId) {
        const user = await getUserByClerkId(clerkId)

        if (user?._id) {
            userRef = { _type: "reference", _ref: user._id };
        }
    }

    const orderProducts = (products || []).map((item: { productId: string, quantity: number }) => ({
      product: { _type: "reference", _ref: item.productId },
      quantity: item.quantity,
      _key: crypto.randomUUID()
    }));

    const piId = clientSecret.split("_secret")[0];

    const order = await writeClient.create({
        _type: "order",
        status: "pending",
        customerName: `${shipping.name} ${shipping.surname}`,
        customerEmail: shipping.email,
        customerCountry: shipping.country,
        customerStreet: shipping.street,
        customerPostalCode: shipping.postalCode,
        customerCity: shipping.city,
        customerPhoneNumber: shipping.phoneNumber,
        totalPrice: total,
        currency,
        amountDiscount,
        orderDate: new Date().toISOString(),
        products: orderProducts,
        orderNumber: crypto.randomUUID(),
        stripePaymentIntentId: piId,
        user: userRef,
    });


    await stripe.paymentIntents.update(piId, {
        metadata: { orderId: order._id },
    });

    return NextResponse.json({ orderId: order._id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
