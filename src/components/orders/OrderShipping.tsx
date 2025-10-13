import { Order } from '@/sanity/types'
import React from 'react'
import { Card } from '../ui/card'

type OrderShippingProps = Pick<Order, "customerCountry" | "customerCity" | "customerStreet" | 'customerPostalCode' | "customerPhoneNumber" | "deliveryMethod">

function OrderShipping({ customerCity, customerCountry, customerPhoneNumber, customerPostalCode, customerStreet, deliveryMethod }: OrderShippingProps) {
  return (
    <Card>
        <h2 className='bigger-text'>Informacje do wysyłki</h2>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex flex-col gap-1 little-bigger-text'>
                <span>Kraj</span>
                <span className='font-semibold'>{customerCountry}</span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Miasto</span>
                <span className='font-semibold'>{customerCity}</span>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex flex-col gap-1 little-bigger-text'>
                <span>Ulica</span>
                <span className='font-semibold'>{customerStreet}</span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Kod pocztowy</span>
                <span className='font-semibold'>{customerPostalCode}</span>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-5 text-center md:text-left'>
            <div className='flex flex-col gap-1 little-bigger-text'>
                <span>Numer telefonu</span>
                <span className='font-semibold'>{customerPhoneNumber}</span>
            </div>
            <div className='flex flex-col gap-1 little-bigger-text md:text-right'>
                <span>Metoda wysyłki</span>
                <span className='font-semibold'>{deliveryMethod}</span>
            </div>
        </div>
    </Card>
  )
}

export default OrderShipping