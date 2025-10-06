"use client"

import React, { useEffect, useState } from 'react'
import Container from '../ui/container'
import NavCard from '../cards/NavCard'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '../ui/navigation-menu'
import Link from 'next/link'
import { Button } from '../ui/button'
import useScroll from '@/lib/hooks/useScroll'
import { NAV_ITEMS } from '@/constants/navItems'
import NavMobile from './NavMobile'
import NavUser from './NavUser'
import Basket from './Basket'
import { useAuth } from '@clerk/nextjs'
import { getUserByClerkId } from '@/sanity/lib/users/getUserByClerkId'
import { UserQueryResult } from '@/sanity/types'

function Nav() {
    const { userId } = useAuth()
    const [user, setUser] = useState<UserQueryResult>(null)
    const { isScrolled } = useScroll({ scrollAmount: 50 })

    useEffect(() => {
        const handleGetUser = async () => {
            if (!userId) return

            const sanityUser = await getUserByClerkId(userId)
            setUser(sanityUser)
        }

        handleGetUser()
    }, [userId])

  return (
    <nav className={`h-nav-height fixed top-0 w-full z-40 ${isScrolled ? "bg-background-light" : "bg-transparent"} transition`}>
        <Container>
            <div className='flex justify-between items-center h-full'>
                <div>
                    <Link href={"/"} title='Strona główna'>
                        <span className='text-lg font-bold'>Piekarnia</span>
                    </Link>
                </div>
                <div className='hidden lg:flex'>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className='gap-0'>
                            {NAV_ITEMS.map(item => (
                                <NavigationMenuItem key={item.label}>
                                    <NavCard item={item} />
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className='hidden lg:flex items-center gap-5'>
                    <Basket />
                    <NavUser />
                    <Button asChild>
                        <Link href={"/sklep"}>
                            Kup teraz
                        </Link>
                    </Button>
                    {user && user.isAdmin && (
                        <Button variant={"outline"} asChild>
                            <Link href={"/zamowienia"}>
                                Zamówienia
                            </Link>
                        </Button>
                    )}
                    {user && !user.isAdmin && (
                        <Button variant={"outline"} asChild>
                            <Link href={"/twoje-zamowienia"}>
                                Moje zamówienia
                            </Link>
                        </Button>
                    )}
                </div>
                <div className='lg:hidden'>
                    <NavMobile />
                </div>
            </div>
        </Container>
    </nav>
  )
}

export default Nav