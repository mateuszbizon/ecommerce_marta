import React from 'react'
import Container from '../ui/container'

type SubPageHeroProps = {
    title?: string
}

function SubPageHero({ title = "Kontakt" }: SubPageHeroProps) {
  return (
    <header className='big-section-padding'>
        <Container className='max-w-[1000px]'>
            <h1 className='heading1 text-center'>{title}</h1>
        </Container>
    </header>
  )
}

export default SubPageHero