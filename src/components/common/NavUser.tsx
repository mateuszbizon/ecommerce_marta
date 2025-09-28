import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'
import React from 'react'

function NavUser() {
  return (
    <ClerkLoaded>
        <SignedOut>
            <SignInButton mode='modal'>
                <LogIn className='size-6 cursor-pointer' />
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </ClerkLoaded>
  )
}

export default NavUser