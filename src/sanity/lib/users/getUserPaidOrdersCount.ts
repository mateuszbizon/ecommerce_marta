import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getUserPaidOrdersCount(clerkId: string) {
    const userPaidOrdersCountQuery = defineQuery(`
        count(*[_type == "order" && user->clerkId == $clerkId && status == "paid"])
    `);
    
    try {
        const result = await client.fetch(userPaidOrdersCountQuery, { clerkId })

        return {
            count: result,
            success: true,
            message: ""
        }
    } catch (error) {
        console.error("Error fetching user paid orders:", error)
        return {
            count: 0,
            success: false,
            message: "Błąd podczas pobierania ilości opłaconych zamówień"
        }
    }
}