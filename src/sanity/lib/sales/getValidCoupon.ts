import { client } from "@/sanity/lib/client"
import { defineQuery } from "next-sanity"

export async function getValidCoupon(code: string) {
    const couponQuery = defineQuery(`
        *[_type == "sale" && couponCode == $code][0]    
    `)

    try {
        const coupon = await client.fetch(couponQuery, { code })

        if (!coupon) return null

        const now = new Date()

        const validFrom = coupon.validFrom ? new Date(coupon.validFrom) : null
        const validUntil = coupon.validUntil ? new Date(coupon.validUntil) : null

        const isExpired = validUntil && now > validUntil
        const notStarted = validFrom && now < validFrom

        if (!coupon.isActive || isExpired || notStarted) {
            return null
        }

        return coupon
    } catch (error) {
        console.error("Error fetching sale:", error)
        return null
    }
}
