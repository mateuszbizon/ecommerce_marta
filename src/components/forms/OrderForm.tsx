"use client"

import { ORDER_STATUS_ADMIN_MAP } from '@/constants/orderStatus'
import { getOrderStatusInfo } from '@/lib/utils'
import React, { FormEvent, useState } from 'react'
import { Button } from '../ui/button'
import { updateOrderStatus } from '@/lib/actions/orders/updateOrderStatus'

type OrderFormProps = {
    orderStatus: string
    orderId: string
}

function OrderForm({ orderStatus, orderId }: OrderFormProps) {
    const currentStatus = getOrderStatusInfo(orderStatus)
    const [selectedStatus, setSelectedStatus] = useState(currentStatus)
    const [isLoading, setIsLoading] = useState(false)

    function handleChangeStatus(newStatus: typeof currentStatus) {
        if (newStatus.title === selectedStatus.title) {
            setSelectedStatus(currentStatus)
            return
        }

        setSelectedStatus(newStatus)
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            await updateOrderStatus({
                orderId,
                orderStatus: selectedStatus.status
            })
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='space-y-5' onSubmit={onSubmit}>
        <div className='flex gap-5 flex-wrap'>
            {Object.values(ORDER_STATUS_ADMIN_MAP).map((item, index) => (
                <button type='button' key={`${item.title}_${index}`} className={`${selectedStatus.title === item.title ? "bg-gray-600" : "bg-transparent"} py-3 px-5 rounded-xl hover:bg-gray-600 cursor-pointer transition`} onClick={() => handleChangeStatus(item)}>
                    <span className={`px-3 py-1 rounded ${item.bg} font-semibold`}>
                        {item.title}
                    </span>
                </button>
            ))}
        </div>
        <Button type='submit' disabled={currentStatus === selectedStatus || isLoading}>
            {isLoading ? "Zmienianie..." : "Zmień status"}
        </Button>
    </form>
  )
}

export default OrderForm