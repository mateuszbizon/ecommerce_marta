export const SHIPPING_MAP: Record<string, { price: number, name: string }> = {
    courier: { price: 19.99, name: "Kurier DPD" },
    "inpost-courier": { price: 15.99, name: "InPost Kurier" },
    inpost: { price: 15.99, name: "InPost Paczkomat" },
    own: { price: 0, name: "Odbiór własny" },
}