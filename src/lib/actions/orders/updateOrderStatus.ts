"use server"

import { writeClient } from "@/sanity/lib/writeClient"

type Props = {
    orderId: string
    orderStatus: string
}

export async function updateOrderStatus({ orderId, orderStatus }: Props) {
    try {
        await writeClient.patch(orderId).set({
            status: orderStatus
        }).commit()
    } catch (error) {
        console.log("Error updating order:", error)
    }
}