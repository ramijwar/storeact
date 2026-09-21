export type Order = { id: number; status?: string; total?: number; created_at?: string; items?: Array<{ name?: string; quantity?: number; price?: number }> };

export async function getOrders(): Promise<Order[]> {
  const result = await request<Order[] | { data?: Order[]; orders?: Order[]; items?: Order[] }>('/orders');
  if (Array.isArray(result)) return result;
  return result.data ?? result.orders ?? result.items ?? [];
}
