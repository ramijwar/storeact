import type { Order } from './api';

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
export type AdminStats = { users: number; stores: number; products: number; orders: number; revenue: number };
export type AdminStore = { id: number; name: string; status?: string; owner_name?: string };
export type AdminUser = { id: number; name: string; email: string; role?: string; status?: string };
export type Category = { id: number; name: string };
export async function getAdminStats() { return request<AdminStats>('/admin/stats'); }
export async function getAdminStores() { return request<AdminStore[] | { data?: AdminStore[]; stores?: AdminStore[] }>('/admin/stores'); }
export async function updateStoreStatus(id: number, status: string) { return request<AdminStore>(`/admin/stores/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }); }
export async function getAdminUsers() { return request<AdminUser[] | { data?: AdminUser[]; users?: AdminUser[] }>('/admin/users'); }
export async function updateUserStatus(id: number, status: string) { return request<AdminUser>(`/admin/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }); }
export async function getAdminOrders() { return request<Order[] | { data?: Order[]; orders?: Order[] }>('/admin/orders'); }
export async function getCategories() { return request<Category[] | { data?: Category[]; categories?: Category[] }>('/categories'); }
export async function createCategory(name: string) { return request<Category>('/admin/categories', { method: 'POST', body: JSON.stringify({ name }) }); }
export async function deleteCategory(id: number) { return request<void>(`/admin/categories/${id}`, { method: 'DELETE' }); }
