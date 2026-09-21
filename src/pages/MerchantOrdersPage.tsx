import { useEffect, useState } from 'react';
import type { Order } from '../lib/api';
import { getMerchantOrders, updateMerchantOrderStatus } from '../lib/merchant-api';

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { getMerchantOrders().then((result) => setOrders(Array.isArray(result) ? result : result.data ?? result.orders ?? [])).catch((err: Error) => setError(err.message)); }, []);
  async function changeStatus(id: number, status: string) { try { const updated = await updateMerchantOrderStatus(id, status); setOrders((current) => current.map((order) => order.id === id ? { ...order, ...updated } : order)); } catch (err) { setError(err instanceof Error ? err.message : 'تعذر تحديث الطلب.'); } }
  return <section className="panel"><h1>طلبات المتجر</h1>{error && <p className="error-message">{error}</p>}{!orders.length && !error && <p>لا توجد طلبات متاحة.</p>}<div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><strong>طلب #{order.id}</strong><span>{order.status || 'جديد'}</span><select value={order.status || 'pending'} onChange={(event) => changeStatus(order.id, event.target.value)}><option value="pending">قيد المراجعة</option><option value="processing">قيد التجهيز</option><option value="shipped">تم الشحن</option><option value="completed">مكتمل</option><option value="cancelled">ملغي</option></select></article>)}</div></section>;
}
