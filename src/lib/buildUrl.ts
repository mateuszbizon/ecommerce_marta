export function buildUrl(query?: string, page?: number) {
  const params = new URLSearchParams();

  if (query) params.set("query", query);

  if (page) params.set("page", page.toString());

  return `/zamowienia?${params.toString()}`;
}