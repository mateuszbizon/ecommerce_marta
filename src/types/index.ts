export type Image = {
    src: string;
    alt: string;
}

export type NavLink = {
    label: string
    href: string
}

export type NavItem = {
    label: string
} & ({
    isLink: true
    href: string
} | {
    isLink: false
    menu: NavLink[]
})