import OrderCard from '@/components/cards/OrderCard'
import SearchForm from '@/components/forms/SearchForm'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { getOrdersBySearch } from '@/sanity/lib/orders/getOrdersBySearch'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

type Props = {
    searchParams: Promise<{ query?: string }>
}

async function OrdersAdminPage({ searchParams }: Props) {
    const query = (await searchParams).query
    const params = { search: query || null }
    const siema = await auth()
    const orders = await getOrdersBySearch(params.search)

  return (
    <>
        <section className='py-section-padding'>
            <Container>
                <h1 className='heading2 heading-margin-bottom'>Zamówienia</h1>
                <Card className='mb-5'>
                    <SearchForm query={query} />
                </Card>
                <div className='flex flex-col gap-5'>
                    {orders.map(item => (
                        <OrderCard key={item._id} order={item} />
                    ))}
                </div>
            </Container>
        </section>
    </>
  )
}

export default OrdersAdminPage