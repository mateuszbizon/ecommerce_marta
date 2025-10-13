import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getOrdersBySearch(searchTerm: string | null = "", page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const term = searchTerm ? `*${searchTerm}*` : "";

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
            )] | order(orderDate desc)[$start...$end]  
        `)

        const countQuery = defineQuery(`
            count(*[_type == "order" && (
                !defined($term) || 
                orderNumber match $term ||
                customerName match $term ||
                customerEmail match $term ||
                customerStreet match $term ||
                customerPostalCode match $term ||
                customerCity match $term ||
                customerPhoneNumber match $term
            )])
        `)

        const orders = await client.fetch(query, { term: searchTerm ? term : searchTerm, start, end });
        const total = await client.fetch(countQuery, { term: searchTerm ? term : searchTerm })

        return {
            orders: orders || [],
            success: true,
            message: "",
            total
        }
    } catch (error) {
        console.error("Error fetching orders by search:", error)
        return {
            orders: [],
            success: false,
            message: "Wystąpił błąd podczas pobierania zamówień",
            total: 0
        }
    }
}