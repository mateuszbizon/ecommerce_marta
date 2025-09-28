import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { NAV_ITEMS } from '@/constants/navItems'
import Link from 'next/link'
import NavUser from './NavUser'

function NavMobile() {
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
                <NavUser />
            </div>
            <Button asChild>
                <Link href={"/sklep"}>
                    Kup teraz
                </Link>
            </Button>
        </SheetContent>
    </Sheet>
  )
}

export default NavMobile