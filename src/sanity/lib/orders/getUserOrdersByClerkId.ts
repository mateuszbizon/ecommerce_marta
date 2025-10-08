import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getUserOrdersByClerkId(clerkId: string) {
    const userOrdersQuery = defineQuery(`
        *[_type == "order" && user->clerkId == $clerkId] | order(orderDate desc){
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
    `)
    
    try {
        const orders = await client.fetch(userOrdersQuery, { clerkId })

        return {
            orders: orders || [],
            success: true,
            message: ""
        }
    } catch (error) {
        console.error("Error fetching user orders:", error)
        return {
            orders: [],
            success: false,
            message: "Wystąpił błąd podczas pobierania zamówień"
        }
    }
}