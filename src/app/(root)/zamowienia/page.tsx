import OrderCard from '@/components/cards/OrderCard'
import SearchForm from '@/components/forms/SearchForm'
import EmptyMessage from '@/components/messages/EmptyMessage'
import ErrorMessage from '@/components/messages/ErrorMessage'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { buildUrl } from '@/lib/buildUrl'
import { getOrdersBySearch } from '@/sanity/lib/orders/getOrdersBySearch'
import React from 'react'

type Props = {
    searchParams: Promise<{ query?: string, page?: number }>
}

async function OrdersAdminPage({ searchParams }: Props) {
    const query = (await searchParams).query
    const page = Number((await searchParams).page) || 1;
    const params = { search: query || null }
    const { orders, success, message, total } = await getOrdersBySearch(params.search, page)
    const lastPage = Math.ceil(total / 5)

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
                {lastPage > 1 && (
                    <Pagination className='mt-10'>
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious href={buildUrl(query, page - 1)} />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink href={buildUrl(query, 1)} isActive={page == 1}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href={buildUrl(query, lastPage)} isActive={page == lastPage}>{lastPage}</PaginationLink>
                            </PaginationItem>
                            {page < lastPage && (
                                <PaginationItem>
                                    <PaginationNext href={buildUrl(query, page + 1)} />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </Container>
        </section>
    </>
  )
}

export default OrdersAdminPage