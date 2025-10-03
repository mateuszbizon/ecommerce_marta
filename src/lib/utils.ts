import { ORDER_STATUS_MAP } from "@/constants/orderStatus";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrderStatusInfo(status: string) {
    return ORDER_STATUS_MAP[status] || { title: status, bg: "bg-gray-200 text-gray-900" };
}