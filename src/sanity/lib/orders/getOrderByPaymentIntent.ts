import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getOrderByPaymentIntent(piId: string) {
    const orderQuery = defineQuery(`
        *[_type == "order" && stripePaymentIntentId == $piId][0]{_id}    
    `)

    try {
        const order = await client.fetch(orderQuery, { piId })

        return order || null
    } catch (error) {
        console.error("Error fetching order by payment intent id:", error)
        return null
    }
}