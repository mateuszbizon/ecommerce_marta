"use client"

import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type SearchFormResetProps = {
    href: string
}

function SearchFormReset({ href }: SearchFormResetProps) {
    function reset() {
        const form = document.querySelector(".search-form") as HTMLFormElement

        if (form) {
            form.reset()
        }
    }

  return (
    <Button type='reset' variant={"destructive"} onClick={reset} asChild>
        <Link href={href}>
            Wyczyść <X />
        </Link>
    </Button>
  )
}

export default SearchFormReset