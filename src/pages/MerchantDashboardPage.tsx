import { useEffect, useState } from 'react';
import { getMerchantStats, type MerchantStats } from '../lib/merchant-api';

export default function MerchantDashboardPage() {
  const [stats, setStats] = useState<MerchantStats | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { getMerchantStats().then(setStats).catch((err: Error) => setError(err.message)); }, []);
  const cards = [['المنتجات', stats?.products ?? '—'], ['الطلبات', stats?.orders ?? '—'], ['المبيعات', stats ? `${Number(stats.sales).toFixed(2)} ر.س` : '—'], ['طلبات معلقة', stats?.pending_orders ?? '—']];
  return <section><h1>لوحة التاجر</h1>{error && <p className="error-message">{error}</p>}<div className="stats-grid">{cards.map(([label, value]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}</div></section>;
}
