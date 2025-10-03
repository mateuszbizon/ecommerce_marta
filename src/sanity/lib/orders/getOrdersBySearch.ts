import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getOrdersBySearch(searchTerm: string | null = "") {
    try {
        const query = defineQuery(`
            *[_type == "order" && (
                !defined($term) ||
                orderNumber match $term ||
                customerName match $term ||
                customerEmail match $term ||
                customerStreet match $term ||
                customerPostalCode match $term ||
                customerCity match $term ||
                customerPhoneNumber match $term
            )] | order(orderDate desc)    
        `)

        const orders = await client.fetch(query, { term: searchTerm });

        return orders || []
    } catch (error) {
        console.error("Error fetching orders by search:", error)
        return []
    }
}