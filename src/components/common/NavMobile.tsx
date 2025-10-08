"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/navItems'
import Link from 'next/link'
import NavUser from './NavUser'
import Basket from './Basket'
import { useAuth } from '@clerk/nextjs'
import { UserQueryResult } from '@/sanity/types'
import { useMediaQuery } from 'react-responsive'
import { getUserByClerkId } from '@/sanity/lib/users/getUserByClerkId'

function NavMobile() {
    const { userId } = useAuth()
    const [user, setUser] = useState<UserQueryResult>(null)
    const isMobile = useMediaQuery({ maxWidth: 1024 })
    const userFetched = useRef(false)

    useEffect(() => {
        const handleGetUser = async () => {
            if (!userId) return

            const sanityUser = await getUserByClerkId(userId)
            setUser(sanityUser)
            userFetched.current = true
        }

        if (!isMobile || userFetched.current) return
   
        handleGetUser()
    }, [userId, isMobile])

  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button size={"icon"}>
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader className='hidden'>
                <SheetTitle>Mobilna nawigacja</SheetTitle>
            </SheetHeader>
            <ul>
                {NAV_ITEMS.map(item => (
                    <li key={item.label}>
                        {item.isLink ? (
                            <Button variant="link" size={"link"} className='text-foreground hover:text-primary py-2 text-lg' asChild>
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            </Button>
                        ) : (
                            <ul>
                                {item.menu.map(menuItem => (
                                    <li key={menuItem.label}>
                                        <Button variant="link" className='text-foreground hover:text-primary text-lg' asChild>
                                            <Link href={menuItem.href}>
                                                {menuItem.label}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <div className='flex gap-5'>
                <Basket />
                <NavUser />
            </div>
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
        </SheetContent>
    </Sheet>
  )
}

export default NavMobile