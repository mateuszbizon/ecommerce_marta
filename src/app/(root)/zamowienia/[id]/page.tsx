import OrderForm from '@/components/forms/OrderForm'
import ErrorMessage from '@/components/messages/ErrorMessage'
import OrderDetails from '@/components/orders/OrderDetails'
import OrderShipping from '@/components/orders/OrderShipping'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { getOrderById } from '@/sanity/lib/orders/getOrderById'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

async function SingleOrderPage({ params }: Props) {
    const orderId = (await params).id
    const { order, success, message } = await getOrderById(orderId)

    if (!success) return <ErrorMessage description={message} />

    if (!order) return notFound()

  return (
    <section className='py-section-padding'>
        <Container className='max-w-[1000px]'>
            <h1 className='heading2 heading-margin-bottom'>Szczegóły zamówienia</h1>
            <Card className='mb-5 relative overflow-hidden'>
                <p className='bigger-text'>Zmień status zamówienia</p>
                <OrderForm orderStatus={order.status!} orderId={order._id} />
                {order.status === "pending" && (
                    <div className='absolute inset-0 bg-black/70 flex justify-center items-center text-center text-white little-bigger-text'>
                        <p>Nie można zmienić statusu zamówienia jeśli status jest na oczekujące</p>
                    </div>
                )}
            </Card>
            <div className='mb-5'>
                <OrderDetails 
                    orderDate={order.orderDate}
                    orderNumber={order.orderNumber}
                    currency={order.currency}
                    totalPrice={order.totalPrice}
                    status={order.status}
                    customerEmail={order.customerEmail}
                    customerName={order.customerName}
                    products={order.products}
                />
            </div>
            <OrderShipping 
                customerCity={order.customerCity}
                customerCountry={order.customerCountry}
                customerPhoneNumber={order.customerPhoneNumber}
                customerPostalCode={order.customerPostalCode}
                customerStreet={order.customerStreet}
            />
        </Container>
    </section>
  )
}

export default SingleOrderPage