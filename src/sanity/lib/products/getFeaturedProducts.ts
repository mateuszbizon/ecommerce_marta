import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getFeaturedProducts() {
    const featuredProductsQuery = defineQuery(`
        *[_type == "product" && isFeatured == true]
    `);

    try {
        const products = await client.fetch(featuredProductsQuery);
        return products || [];
    } catch (error) {
        console.log("Error fetching featured products:", error);
        return [];
    }
}