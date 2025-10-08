import OrderCard from '@/components/cards/OrderCard'
import SearchForm from '@/components/forms/SearchForm'
import EmptyMessage from '@/components/messages/EmptyMessage'
import ErrorMessage from '@/components/messages/ErrorMessage'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { getOrdersBySearch } from '@/sanity/lib/orders/getOrdersBySearch'
import React from 'react'

type Props = {
    searchParams: Promise<{ query?: string }>
}

async function OrdersAdminPage({ searchParams }: Props) {
    const query = (await searchParams).query
    const params = { search: query || null }
    const { orders, success, message } = await getOrdersBySearch(params.search)

    if (!success) return <ErrorMessage description={message} />

  return (
    <>
        <section className='py-section-padding'>
            <Container>
                <h1 className='heading2 mb-10'>Zamówienia</h1>
                <Card className='mb-5'>
                    <SearchForm query={query} />
                </Card>
                {orders.length < 1 && (
                    <EmptyMessage title='Brak zamówień' description='Nie znaleziono żadnych zamówień.' />
                )}
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