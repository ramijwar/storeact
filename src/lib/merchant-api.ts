import type { Order, Product } from './api';

const API_URL = (import.meta.env.VITE_API_URL || 'https://t3lam.site/storeact/api').replace(/\/$/, '');

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
  if (!response.ok) throw new Error(typeof data === 'object' && data && 'message' in data ? String(data.message) : `فشل الطلب (${response.status})`);
  return data as T;
}

export type MerchantStats = { products: number; orders: number; sales: number; pending_orders: number };
export async function getMerchantStats() { return request<MerchantStats>('/merchant/stats'); }
export async function getMerchantProducts() { return request<Product[] | { data?: Product[]; products?: Product[] }>('/merchant/products'); }
export async function createMerchantProduct(payload: Partial<Product>) { return request<Product>('/merchant/products', { method: 'POST', body: JSON.stringify(payload) }); }
export async function updateMerchantProduct(id: number, payload: Partial<Product>) { return request<Product>(`/merchant/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }); }
export async function deleteMerchantProduct(id: number) { return request<void>(`/merchant/products/${id}`, { method: 'DELETE' }); }
export async function getMerchantOrders() { return request<Order[] | { data?: Order[]; orders?: Order[] }>('/merchant/orders'); }
export async function updateMerchantOrderStatus(id: number, status: string) { return request<Order>(`/merchant/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }); }
