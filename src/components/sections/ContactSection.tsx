import React from 'react'
import Container from '../ui/container'
import { MailCheck, MapPin, PhoneCall } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EMAIL, LOCATION, PHONE_NUMBER } from '@/constants'
import Facebook from '../ui/icons/Facebook'
import Instagram from '../ui/icons/Instagram'

function ContactSection() {
  return (
    <section className='py-section-padding bg-background-dark'>
        <Container>
            <h2 className='heading2 text-center heading-margin-bottom'>Skontaktuj się z nami</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
                <div className='flex flex-col justify-center bg-linear-to-r from-background-light to-background hover:from-background-light hover:to-background-light rounded-2xl p-5 space-y-10 transition duration-300'>
                    <div className='flex gap-5 items-center'>
                        <PhoneCall className='size-10 h-fit text-primary' />
                        <div className='flex flex-col'>
                            <span>Zadzwoń do nas</span>
                            <Button variant={"link"} size={"link"} className='text-foreground text-lg hover:text-primary font-semibold' asChild>
                                <Link href={`tel:${PHONE_NUMBER}`}>
                                    {PHONE_NUMBER}
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <MailCheck className='size-10 h-fit text-primary' />
                        <div className='flex flex-col'>
                            <span>Napisz do nas</span>
                            <Button variant={"link"} size={"link"} className='text-foreground text-lg hover:text-primary font-semibold' asChild>
                                <Link href={`mailto:${EMAIL}`}>
                                    {EMAIL}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center bg-linear-to-r from-background-light to-background hover:from-background-light hover:to-background-light rounded-2xl p-5 space-y-5 transition duration-300'>
                    <p className='bigger-text text-center'>Nasze sociale</p>
                    <div className='flex gap-5 justify-center'>
                        <Button size={"icon"} className='size-13' asChild>
                            <Link href={"https://www.facebook.com/"} target='_blank'>
                                <span className='sr-only'>facebook</span>
                                <Facebook className='size-7' />
                            </Link>
                        </Button>
                        <Button size={"icon"} className='size-13' asChild>
                            <Link href={"https://www.instagram.com/"} target='_blank'>
                                <span className='sr-only'>instagram</span>
                                <Instagram className='size-9' />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col justify-center bg-linear-to-r from-background-light to-background hover:from-background-light hover:to-background-light rounded-2xl p-5 space-y-10 transition duration-300'>
                    <div className='flex gap-5 items-center'>
                        <MapPin className='size-10 h-fit text-primary' />
                        <div className='flex flex-col'>
                            <span>Nasza lokalizacja</span>
                            <p className='text-lg font-semibold'>{LOCATION}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </section>
  )
}

export default ContactSection