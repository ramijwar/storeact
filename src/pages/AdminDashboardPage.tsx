import { useEffect, useState } from 'react';
import { getAdminStats, type AdminStats } from '../lib/admin-api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { getAdminStats().then(setStats).catch((err: Error) => setError(err.message)); }, []);
  const cards = [['المستخدمون', stats?.users ?? '—'], ['المتاجر', stats?.stores ?? '—'], ['المنتجات', stats?.products ?? '—'], ['الطلبات', stats?.orders ?? '—'], ['الإيرادات', stats ? `${Number(stats.revenue).toFixed(2)} ر.س` : '—']];
  return <section><h1>لوحة المدير</h1>{error && <p className="error-message">{error}</p>}<div className="stats-grid">{cards.map(([label, value]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}</div></section>;
}
