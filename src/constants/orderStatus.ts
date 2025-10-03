export const ORDER_STATUS_MAP: Record<string, { title: string; bg: string }> = {
    pending:    { title: "Oczekujące", bg: "bg-yellow-200 text-yellow-900" },
    paid:       { title: "Opłacone",   bg: "bg-green-200 text-green-900" },
    shipped:    { title: "Wysłane",    bg: "bg-blue-200 text-blue-900" },
    delivered:  { title: "Dostarczone",bg: "bg-purple-200 text-purple-900" },
    cancelled:  { title: "Anulowane",  bg: "bg-red-200 text-red-900" },
};