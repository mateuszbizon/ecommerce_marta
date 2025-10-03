import { Order } from '@/sanity/types'
import React from 'react'
import { Card } from '../ui/card'
import Link from 'next/link'
import { getOrderStatusInfo } from '@/lib/utils'

type OrderCardProps = {
    order: Order
}

function OrderCard({ order }: OrderCardProps) {
    const statusInfo = getOrderStatusInfo(order.status!)

  return (
    <Link href={`/zamowienia/${order._id}`}>
        <Card className='hover:bg-card/50'>
            <p className='little-bigger-text'>Numer zamówienia: <span className='font-medium'>{order.orderNumber}</span></p>
            <div className='flex gap-5 flex-wrap'>
                <p>Cena: <span className='font-medium'>{order.totalPrice}</span></p>
                <p>
                    Status: {" "}
                    <span className={`px-3 py-1 rounded ${statusInfo.bg} font-semibold`}>
                        {statusInfo.title}
                    </span>
                </p>
                <p>Osoba: <span className='font-medium'>{order.customerName}</span></p>
                <p>Email: <span className='font-medium'>{order.customerEmail}</span></p>
            </div>
        </Card>
    </Link>
  )
}

export default OrderCard