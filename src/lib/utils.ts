import { ORDER_STATUS_MAP } from "@/constants/orderStatus";
import { SHIPPING_MAP } from "@/constants/shipping";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrderStatusInfo(status: string) {
    return ORDER_STATUS_MAP[status] || { title: status, bg: "bg-gray-200 text-gray-900" };
}

export function getShippingInfo(method: string) {
    return SHIPPING_MAP[method] || { price: 0, name: "" };
}