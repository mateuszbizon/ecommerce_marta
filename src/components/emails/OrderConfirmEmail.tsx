import React from 'react'

type OrderConfirmEmailProps = {
    orderNumber: string
    customerName: string
    totalPrice: number
}

function OrderConfirmEmail({ orderNumber, customerName, totalPrice }: OrderConfirmEmailProps) {
  return (
    <div>
        <h1>Dziękujemy za zamówienie!</h1>
        <p>Cześć {customerName}</p>
        <p>Twoje zamówienie o numerze <strong>{orderNumber}</strong> zostało opłacone.</p>
        <p>Łączna kwota: <strong>{totalPrice} PLN</strong></p>
    </div>
  )
}

export default OrderConfirmEmail