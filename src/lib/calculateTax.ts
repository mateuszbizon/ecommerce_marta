import { TAX } from "@/constants";

export function calculateTax(price: number = 0) {
    return price + (price * (TAX / 100))
}