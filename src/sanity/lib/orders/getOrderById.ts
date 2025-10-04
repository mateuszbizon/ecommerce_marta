import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getOrderById(orderId: string) {
    const singleOrderQuery = defineQuery(`
        *[_type == "order" && _id == $orderId][0]{
            ...,
            products[]{
                quantity,
                product->{
                    _id,
                    name,
                    price,
                    image
                }
            }
        }
    `);

    try {
        const order = await client.fetch(singleOrderQuery, { orderId });

        return order || null
    } catch (error) {
        console.error("Error fetching single order:", error)
        return null
    }
}