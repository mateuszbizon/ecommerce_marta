import { Product } from "@/sanity/types"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BasketItem = {
    product: Product
    quantity: number
}

export type Coupon = {
    code: string
    amountDiscount: number
} | null

type BasketState = {
    items: BasketItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearBasket: () => void
    getTotalPrice: () => number
    getItemCount: (productId: string) => number
    getGroupedItems: () => BasketItem[]
    getAllItemsQuantity: () => number
    appliedCoupon: Coupon
    applyCoupon: (coupon: Coupon) => void
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => set(state => {
                const existingItem = state.items.find(item => item.product._id === product._id)

                if (existingItem) {
                    return {
                        items: state.items.map(item => item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
                    }
                } else {
                    return {
                        items: [...state.items, { product, quantity: 1 }]
                    }
                }
            }),
            removeItem: (productId) => set(state => ({
                items: state.items.reduce((acc, item) => {
                    if (item.product._id === productId) {
                        if (item.quantity > 1) {
                            acc.push({ ...item, quantity: item.quantity - 1 })
                        }
                    } else {
                        acc.push(item)
                    }
                    
                    return acc
                }, [] as BasketItem[])
            })),
            clearBasket: () => set(() => ({
                items: []
            })),
            getTotalPrice: () => {
                const baseTotal =  get().items.reduce((acc, item) => {
                    return acc + ((item.product.price ?? 0) * item.quantity)
                }, 0)

                const coupon = get().appliedCoupon

                return coupon ? baseTotal - (baseTotal * (coupon.amountDiscount / 100)) : baseTotal
            },
            getItemCount: (productId) => {
                const item = get().items.find(item => item.product._id === productId)

                return item ? item.quantity : 0
            },
            getGroupedItems: () => {
                return get().items
            },
            getAllItemsQuantity: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0)
            },
            appliedCoupon: null,
            applyCoupon: (coupon) => set(() => ({
                appliedCoupon: coupon
            })),
        }),
        {
            name: "basket-store"
        }
    )
)

export default useBasketStore