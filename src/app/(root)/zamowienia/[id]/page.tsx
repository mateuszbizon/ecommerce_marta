import OrderForm from '@/components/forms/OrderForm'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { getOrderStatusInfo } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { getOrderById } from '@/sanity/lib/orders/getOrderById'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    params: Promise<{ id: string }>
}

async function SingleOrderPage({ params }: Props) {
    const orderId = (await params).id
    const order = await getOrderById(orderId)
    const statusInfo = getOrderStatusInfo(order?.status!)

    if (!order) return notFound()

  return (
    <section className='py-section-padding'>
        <Container>
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
            <Card>
                <p className='bigger-text'>Numer zamówienia: <span className='font-semibold'>{order.orderNumber}</span></p>
                <div className='flex gap-x-8 gap-y-5 flex-wrap little-bigger-text'>
                    <p>Cena: <span className='font-medium'>{order.totalPrice}</span></p>
                    <p>Waluta: <span className='font-medium'>{order.currency}</span></p>
                    <p>Wysokość obniżki (%): <span className='font-medium'>{order.amountDiscount}</span>%</p>
                    <p>
                        Status: {" "}
                        <span className={`px-3 py-1 rounded ${statusInfo.bg} font-semibold`}>
                            {statusInfo.title}
                        </span>
                    </p>
                    <p>Osoba: <span className='font-medium'>{order.customerName}</span></p>
                    <p>Email: <span className='font-medium'>{order.customerEmail}</span></p>
                    <p>
                        Data zamówienia:{" "}
                        <span className='font-medium'>
                            {order.orderDate ? new Date(order.orderDate).toLocaleString("pl-PL", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }) : ""}
                        </span>
                    </p>
                </div>
                <div className='space-y-4 mt-2'>
                    <p className='bigger-text'>Informacje do wysyłki</p>
                    <div className='flex gap-x-8 gap-y-5 flex-wrap little-bigger-text'>
                        <p>Kraj: <span className='font-medium'>{order.customerCountry}</span></p>
                        <p>Ulica: <span className='font-medium'>{order.customerStreet}</span></p>
                        <p>Miasto: <span className='font-medium'>{order.customerCity}</span></p>
                        <p>Kod pocztowy: <span className='font-medium'>{order.customerPostalCode}</span></p>
                        <p>Numer telefonu: <span className='font-medium'>{order.customerPhoneNumber}</span></p>
                    </div>
                </div>
                <div className='space-y-4 mt-2'>
                    <p className='bigger-text'>Zamówione produkty</p>
                    <div className='space-y-5'>
                        {order.products?.map(item => (
                            <div key={item.product?._id} className='flex flex-col md:flex-row gap-8 items-center'>
                                {item.product?.image && (
                                    <figure className='relative size-40 rounded-2xl overflow-hidden'>
                                        <Image src={urlFor(item.product.image).url()} alt={item.product.name || ""} fill className='object-cover' />
                                    </figure>
                                )}
                                <div className='flex flex-col md:flex-row gap-8 md:items-center'>
                                    <div className='space-y-2 text-center md:text-left'>
                                        <p className='little-bigger-text font-medium'>Nazwa produktu</p>
                                        <p className='bigger-text font-semibold'>{item.product?.name}</p>
                                    </div>
                                    <div className='space-y-2 text-center md:text-left'>
                                        <p className='little-bigger-text font-medium'>Ilość sztuk</p>
                                        <p className='bigger-text font-semibold'>{item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </Container>
    </section>
  )
}

export default SingleOrderPage