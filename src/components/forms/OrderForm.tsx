"use client"

import { ORDER_STATUS_ADMIN_MAP } from '@/constants/orderStatus'
import { getOrderStatusInfo } from '@/lib/utils'
import React, { useState } from 'react'

type OrderFormProps = {
    orderStatus: string
}

function OrderForm({ orderStatus }: OrderFormProps) {
    const [selectedStatus, setSelectedStatus] = useState(() => getOrderStatusInfo(orderStatus).title)

    function handleChangeStatus(newStatus: string) {
        if (newStatus === selectedStatus) {
            setSelectedStatus(() => getOrderStatusInfo(orderStatus).title)
            return
        }

        setSelectedStatus(newStatus)
    }

  return (
    <div className='flex gap-5 flex-wrap'>
        {Object.values(ORDER_STATUS_ADMIN_MAP).map((item, index) => (
            <button key={`${item.title}_${index}`} className={`${selectedStatus === item.title ? "bg-gray-600" : "bg-transparent"} py-3 px-5 rounded-xl hover:bg-gray-600 cursor-pointer transition`} onClick={() => handleChangeStatus(item.title)}>
                <span className={`px-3 py-1 rounded ${item.bg} font-semibold`}>
                    {item.title}
                </span>
            </button>
        ))}
    </div>
  )
}

export default OrderForm