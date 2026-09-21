const API_URL = (import.meta.env.VITE_API_URL || 'https://t3lam.site/storeact/api').replace(/\/$/, '');

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('storeact_token');
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_URL}/${path.replace(/^\//, '')}`, { ...options, headers });
  const text = await response.text();
  let data: unknown = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) {
    const message = typeof data === 'object' && data && 'message' in data ? String(data.message) : `فشل الطلب (${response.status})`;
    throw new ApiError(message, response.status);
  }
  return data as T;
}

export type Product = { id: number; name: string; description?: string; price: number; stock?: number; image?: string; category_name?: string; store_name?: string };
type ApiList<T> = T[] | { data?: T[]; products?: T[]; items?: T[]; total?: number };

export async function getProducts(search = ''): Promise<{ items: Product[]; total: number }> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const result = await request<ApiList<Product>>(`/products${query}`);
  if (Array.isArray(result)) return { items: result, total: result.length };
  const items = result.data ?? result.products ?? result.items ?? [];
  return { items, total: result.total ?? items.length };
}

export async function getProduct(id: number): Promise<Product> {
  const result = await request<Product | { data: Product }>(`/products/${id}`);
  return 'data' in result ? result.data : result;
}

export async function login(email: string, password: string) {
  return request<{ token: string; user: { id: number; name: string; email: string; role?: string } }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function register(payload: { name: string; email: string; password: string }) {
  return request<{ token?: string; user?: { id: number; name: string; email: string; role?: string }; message?: string }>('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function createOrder(payload: { items: Array<{ product_id: number; quantity: number }>; address: string }) {
  return request<{ id?: number; order_id?: number; message?: string }>('/orders', { method: 'POST', body: JSON.stringify(payload) });
}
