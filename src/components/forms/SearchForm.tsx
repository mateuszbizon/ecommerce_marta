"use client"

import React from 'react'
import Form from "next/form"
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SearchFormReset from './SearchFormReset';
import { usePathname } from 'next/navigation';

type SearchFormProps = {
    query?: string;
}

function SearchForm({ query }: SearchFormProps) {
    const pathname = usePathname()

  return (
    <Form action={pathname} scroll={false} className='flex gap-5 flex-wrap items-center search-form'>
        <Input type="text" name='query' defaultValue={query} className='max-w-[300px]' placeholder='Wyszukaj...' />

        <div className='flex gap-2'>
            {query && (
                <SearchFormReset href={pathname} />
            )}

            <Button type='submit'>
                Szukaj <Search />
            </Button>
        </div>
    </Form>
  )
}

export default SearchForm