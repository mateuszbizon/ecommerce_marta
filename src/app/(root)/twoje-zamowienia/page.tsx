import EmptyMessage from '@/components/messages/EmptyMessage'
import ErrorMessage from '@/components/messages/ErrorMessage'
import OrderDetails from '@/components/orders/OrderDetails'
import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { getUserOrdersByClerkId } from '@/sanity/lib/orders/getUserOrdersByClerkId'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

async function UserOrdersPage() {
    const { userId } = await auth()

    if (!userId) return null

    const { orders, success, message } = await getUserOrdersByClerkId(userId)

    if (!success) return <ErrorMessage description={message} />

  return (
    <>
        <section className='py-section-padding'>
            <Container className='max-w-[1000px]'>
                <h1 className='heading2 mb-10'>Twoje zamówienia</h1>
                {orders.length < 1 && (
                    <EmptyMessage 
                        title='Brak zamówień' 
                        description='Wydaje się że jeszcze nie złożyłeś/aś żadnych zamówień.'
                        actions={
                            <Button asChild>
                                <Link href={"/sklep"}>
                                    Przejdź do sklepu
                                </Link>
                            </Button>
                        }
                    />
                )}
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