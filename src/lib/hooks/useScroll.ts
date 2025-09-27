import { useEffect, useState } from 'react'

type Props = {
    scrollAmount?: number
}

function useScroll({ scrollAmount = 500 }: Props) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > scrollAmount) {
                setIsScrolled(true)
                return
            }

            setIsScrolled(false)
        }

        handleScroll()

        document.addEventListener("scroll", handleScroll)

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [])

  return {
    isScrolled
  }
}

export default useScroll