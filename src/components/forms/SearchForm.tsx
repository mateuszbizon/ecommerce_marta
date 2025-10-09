import React from 'react'
import Form from "next/form"
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SearchFormReset from './SearchFormReset';

type SearchFormProps = {
    query?: string;
}

function SearchForm({ query }: SearchFormProps) {
  return (
    <Form action="/zamowienia" scroll={false} className='flex gap-5 flex-wrap items-center search-form'>
        <Input type="text" name='query' defaultValue={query} className='max-w-[300px]' placeholder='Wyszukaj...' />

        <div className='flex gap-2'>
            {query && (
                <SearchFormReset />
            )}

            <Button type='submit'>
                Szukaj <Search />
            </Button>
        </div>
    </Form>
  )
}

export default SearchForm