"use client"

import React from 'react'
import Container from '../ui/container'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { CIASTKA_IMG } from '@/constants/images'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

function Hero() {
    useGSAP(() => {
        gsap.fromTo(".img", {
            x: "-100%",
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 1
        })
        gsap.fromTo(".text-side", {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.3,
            delay: 0.5
        })
    }, [])

  return (
    <header className='py-section-padding lg:py-0 lg:h-screen bg-linear-to-r from-background-light to-background'>
        <Container>
            <div className='h-full grid lg:grid-cols-2 gap-10 lg:gap-5'>
                <div className='flex flex-col lg:justify-center gap-8'>
                    <h1 className='heading1 text-side'>Piekarnia</h1>
                    <p className='bigger-text text-side'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in  orci ac justo sodales tempus. Curabitur id enim eget nisl molestie  pulvinar.
                    </p>
                    <div className='text-side'>
                        <Button size={"lg"} className='text-lg' asChild>
                            <Link href={"/sklep"}>
                                Kup teraz
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className='flex flex-col justify-center'>
                    <figure className='relative w-full max-w-[600px] mx-auto aspect-video img'>
                        <Image src={CIASTKA_IMG.src} alt={CIASTKA_IMG.alt} fill className='rounded-2xl' />
                    </figure>
                </div>
            </div>
        </Container>
    </header>
  )
}

export default Hero