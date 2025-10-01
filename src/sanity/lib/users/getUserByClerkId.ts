import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getUserByClerkId(clerkId: string) {
    const userQuery = defineQuery(`
        *[_type == "user" && clerkId == $clerkId][0]{_id}    
    `)

    try {
        const user = await client.fetch(userQuery, { clerkId })

        return user || null
    } catch (error) {
        console.error("Error fetching user by clerk id:", error)
        return null
    }
}