import React from 'react'
import Container from '../ui/container'
import Link from 'next/link'
import { Button } from '../ui/button'
import { EMAIL, LOCATION, PHONE_NUMBER } from '@/constants'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FOOTER_NAV_ITEMS } from '@/constants/navItems'
import Instagram from '../ui/icons/Instagram'
import Facebook from '../ui/icons/Facebook'

function Footer() {
  return (
    <footer className='pt-section-padding pb-10 bg-linear-to-r from-background-light to-background'>
        <Container>
            <div className='grid md:grid-cols-[repeat(auto-fit,_280px)] gap-10 md:gap-20'>
                <div className='space-y-4 text-center md:text-left'>
                    <p className='bigger-text'>
                        Piekarnia
                    </p>
                    <p className='md:text-lg'>
                        <em>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in  orci ac justo sodales tempus. Curabitur id enim eget nisl molestie  pulvinar.
                        </em>
                    </p>
                </div>

                <div className='space-y-4 text-center md:text-left'>
                    <p className='bigger-text'>Nawigacja</p>
                    <nav>
                        <ul className='space-y-2'>
                            {FOOTER_NAV_ITEMS.map(item => {
                                if (!item.isLink) return null

                                return (
                                    <li key={item.label}>
                                        <Button className='text-foreground hover:text-foreground/50' size={"link"} variant={"link"} asChild>
                                            <Link href={item.href}>
                                                {item.label}
                                            </Link>
                                        </Button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>

                {/* <div className='space-y-4 text-center md:text-left'>
                    <p className='bigger-text'>Menu</p>
                    <nav>
                        <ul className='space-y-2'>
                            {MENU_ITEMS.map(item => (
                                <li key={item.label}>
                                    <Button className='text-foreground hover:text-foreground/50' size={"link"} variant={"link"} asChild>
                                        <Link href={item.href}>
                                            {item.label}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div> */}

                <div className='space-y-4 text-center md:text-left'>
                    <p className='bigger-text'>Dane kontaktowe</p>
                    <div className='space-y-5'>
                        <div>
                            <Button variant={"link"} size={"link"} className='text-foreground hover:text-foreground/50' asChild>
                                <Link href={`tel:${PHONE_NUMBER}`}>
                                    <Phone className='size-5' /> {PHONE_NUMBER}
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <Button variant={"link"} size={"link"} className='text-foreground hover:text-foreground/50' asChild>
                                <Link href={`mailto:${EMAIL}`}>
                                    <Mail className='size-5' /> {EMAIL}
                                </Link>
                            </Button>
                        </div>
                        <div className='flex gap-2 items-center font-medium'>
                            <MapPin className='size-5' /> {LOCATION}
                        </div>
                        <div className='flex justify-center lg:justify-start items-center gap-3 text-foreground'>
                            <Button size={"icon"} asChild>
                                <Link href={"https://www.facebook.com/"} target='_blank'>
                                    <span className='sr-only'>facebook</span>
                                    <Facebook className='size-5' />
                                </Link>
                            </Button>
                            <Button size={"icon"} asChild>
                                <Link href={"https://www.instagram.com/"} target='_blank' title='Instagram'>
                                    <span className='sr-only'>instagram</span>
                                    <Instagram className='size-6' />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-section-padding flex justify-between items-center'>
                <p>
                    &copy; {new Date().getFullYear()} | <span className='font-semibold'>Nazwa Firmy</span>
                </p>
            </div>
        </Container>
    </footer>
  )
}

export default Footer