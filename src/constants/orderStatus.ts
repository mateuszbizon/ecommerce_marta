export const ORDER_STATUS_MAP: Record<string, { title: string; bg: string, status: string }> = {
    pending:    { title: "Oczekujące", bg: "bg-yellow-200 text-yellow-900", status: "pending" },
    paid:       { title: "Opłacone",   bg: "bg-green-200 text-green-900", status: "paid" },
    shipped:    { title: "Wysłane",    bg: "bg-blue-200 text-blue-900", status: "shipped" },
    delivered:  { title: "Dostarczone",bg: "bg-purple-200 text-purple-900", status: "delivered" },
    cancelled:  { title: "Anulowane",  bg: "bg-red-200 text-red-900", status: "cancelled" },
};

export const ORDER_STATUS_ADMIN_MAP: Record<string, { title: string; bg: string, status: string }> = {
    shipped:    { title: "Wysłane",    bg: "bg-blue-200 text-blue-900", status: "shipped" },
    delivered:  { title: "Dostarczone",bg: "bg-purple-200 text-purple-900", status: "delivered" },
    cancelled:  { title: "Anulowane",  bg: "bg-red-200 text-red-900", status: "cancelled" },
};