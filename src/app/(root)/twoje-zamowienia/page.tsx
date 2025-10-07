import OrderDetails from '@/components/orders/OrderDetails'
import Container from '@/components/ui/container'
import { getUserOrdersByClerkId } from '@/sanity/lib/orders/getUserOrdersByClerkId'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function UserOrdersPage() {
    const { userId } = await auth()

    if (!userId) return null

    const orders = await getUserOrdersByClerkId(userId)

  return (
    <>
        <section className='py-section-padding'>
            <Container className='max-w-[1000px]'>
                <h1 className='heading2 mb-10'>Twoje zamówienia</h1>
                <div className='space-y-5'>
                    {orders.map(item => (
                        <OrderDetails 
                            key={item._id}
                            products={item.products}
                            orderDate={item.orderDate}
                            orderNumber={item.orderNumber}
                            currency={item.currency}
                            totalPrice={item.totalPrice}
                            status={item.status}
                            customerEmail={item.customerEmail}
                            customerName={item.customerName}
                        />
                    ))}
                </div>
            </Container>
        </section>
    </>
  )
}

export default UserOrdersPage