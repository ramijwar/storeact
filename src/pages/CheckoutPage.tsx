import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../lib/api';
import { useCartStore } from '../stores/cart.store';

export default function CheckoutPage() {
  const { items, clear, total } = useCartStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  if (!items.length) return <main className="page-shell"><section className="panel"><h1>لا توجد منتجات لإتمام الطلب</h1><Link to="/products">العودة للمنتجات</Link></section></main>;
  async function submit(event: React.FormEvent) { event.preventDefault(); if (!address.trim()) { setError('يرجى إدخال العنوان.'); return; } setLoading(true); setError(''); try { const result = await createOrder({ address, items: items.map((item) => ({ product_id: item.id, quantity: item.quantity })) }); clear(); navigate(`/order-success?id=${result.id ?? result.order_id ?? ''}`); } catch (err) { setError(err instanceof Error ? err.message : 'تعذر إنشاء الطلب.'); } finally { setLoading(false); } }
  return <main className="page-shell"><section className="panel checkout"><h1>إتمام الطلب</h1><p>الإجمالي: <strong>{total().toFixed(2)} ر.س</strong></p><form onSubmit={submit}><label>العنوان<input value={address} onChange={(event) => setAddress(event.target.value)} required /></label>{error && <p className="error-message">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'جارٍ الإرسال...' : 'تأكيد الطلب'}</button></form></section></main>;
}
