import { useEffect, useState } from 'react';
import { getOrders, type Order } from '../lib/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { getOrders().then(setOrders).catch((err: Error) => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <section className="panel"><h1>طلباتي</h1>{loading && <p>جارٍ تحميل الطلبات...</p>}{error && <p className="error-message">{error}</p>}{!loading && !error && !orders.length && <p>لا توجد طلبات حتى الآن.</p>}<div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div><strong>طلب #{order.id}</strong><p>{order.created_at || 'تاريخ غير متاح'}</p></div><span>{order.status || 'قيد المراجعة'}</span><strong>{order.total == null ? '—' : `${Number(order.total).toFixed(2)} ر.س`}</strong></article>)}</div></section>;
}
