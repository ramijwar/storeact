import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMerchantProduct } from '../lib/merchant-api';

export default function MerchantProductFormPage() {
  const navigate = useNavigate(); const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }
  async function submit(event: FormEvent) { event.preventDefault(); if (!form.name.trim() || Number(form.price) < 0 || Number(form.stock) < 0) { setError('أدخل اسمًا وسعرًا ومخزونًا صالحًا.'); return; } setLoading(true); setError(''); try { await createMerchantProduct({ name: form.name.trim(), description: form.description.trim(), price: Number(form.price), stock: Number(form.stock) }); navigate('/merchant/products'); } catch (err) { setError(err instanceof Error ? err.message : 'تعذر إنشاء المنتج.'); } finally { setLoading(false); } }
  return <section className="panel"><h1>إضافة منتج</h1><form className="form-grid" onSubmit={submit}><label>اسم المنتج<input value={form.name} onChange={(e) => update('name', e.target.value)} required /></label><label>الوصف<textarea value={form.description} onChange={(e) => update('description', e.target.value)} /></label><label>السعر<input type="number" min="0" step="0.01" value={form.price} onChange={(e) => update('price', e.target.value)} required /></label><label>المخزون<input type="number" min="0" value={form.stock} onChange={(e) => update('stock', e.target.value)} required /></label>{error && <p className="error-message">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'جارٍ الحفظ...' : 'حفظ المنتج'}</button></form></section>;
}
