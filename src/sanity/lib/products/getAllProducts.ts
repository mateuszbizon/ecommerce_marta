import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getAllProducts() {
    const allProductsQuery = defineQuery(`
        *[_type == "product"]    
    `)

    try {
        const products = await client.fetch(allProductsQuery)

        return {
            products: products || [],
            success: true,
            message: ""
        }
    } catch (error) {
        console.log("Error fetchting produts:", error)
        return {
            products: [],
            success: false,
            message: "Wystąpił błąd podczas pobierania produktów"
        }
    }
}