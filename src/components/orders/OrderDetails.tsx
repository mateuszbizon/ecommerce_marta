import React from 'react'
import { Card } from '../ui/card'
import { Order, SingleOrderQueryResult } from '@/sanity/types'
import { formatCurrency } from '@/lib/formatCurrency'
import { getOrderStatusInfo } from '@/lib/utils'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type OrderDetailsProps = Pick<Order, "currency" | "totalPrice" | "orderNumber" | "orderDate" | "status" | "customerName" | "customerEmail"> & Pick<NonNullable<SingleOrderQueryResult>, "products">

function OrderDetails({ orderDate, orderNumber, currency, totalPrice, status, customerName, customerEmail, products }: OrderDetailsProps) {
    const statusInfo = getOrderStatusInfo(status!)

  return (
    <Card>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex flex-col gap-1 little-bigger-text'>
                <span>Numer zamówienia</span>
                <span className='font-semibold'>{orderNumber}</span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Cena</span>
                <span className='font-semibold'>{formatCurrency(totalPrice || 0, currency)}</span>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex items-center justify-center md:justify-start gap-2 little-bigger-text'>
                <span>Status:</span>
                <span className={`px-3 py-1 rounded ${statusInfo.bg} font-semibold`}>
                    {statusInfo.title}
                </span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Data</span>
                <span className='font-medium'>
                    {orderDate ? new Date(orderDate).toLocaleString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    }) : ""}
                </span>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex flex-col gap-1 little-bigger-text'>
                <span>Osoba</span>
                <span className='font-medium'>{customerName}</span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Adres email</span>
                <span className='font-medium'>{customerEmail}</span>
            </div>
        </div>
        <div className='space-y-5 text-center md:text-left'>
            <h2 className='bigger-text'>Zamówione produkty</h2>
            {products?.map(item => (
                <div key={item.product?._id} className='flex flex-col md:flex-row items-center gap-5'>
                    {item.product?.image && (
                        <figure className='relative size-20 rounded-2xl overflow-hidden'>
                            <Image src={urlFor(item.product.image).url()} alt={item.product.name || ""} fill className='object-cover' />
                        </figure>
                    )}
                    <div className='flex flex-col gap-1 little-bigger-text'>
                        <span>{item.product?.name}</span>
                        <span className='font-semibold'>Ilość sztuk: {item.quantity}</span>
                    </div>
                </div>
            ))}
        </div>
    </Card>
  )
}

export default OrderDetails