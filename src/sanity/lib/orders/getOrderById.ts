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

        return {
            order: order || null,
            success: true,
            message: ""
        }
    } catch (error) {
        console.error("Error fetching single order:", error)
        return {
            order: null,
            success: false,
            message: "Wystąpił błąd podczas pobierania zamówienia"
        }
    }
}