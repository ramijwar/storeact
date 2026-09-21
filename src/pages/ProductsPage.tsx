import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, type Product } from '../lib/api';

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const search = params.get('search') ?? '';

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProducts(search).then((result) => { if (active) setItems(result.items); })
      .catch((err: Error) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search]);

  return <main className="page-shell">
    <section className="panel">
      <div className="section-heading"><div><p className="eyebrow">اكتشف ما يناسبك</p><h1>المنتجات</h1></div><form onSubmit={(event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get('search')?.toString() ?? ''; setParams(value ? { search: value } : {}); }}><input name="search" defaultValue={search} placeholder="ابحث عن منتج" aria-label="البحث عن منتج" /><button className="primary-button" type="submit">بحث</button></form></div>
      {loading && <p>جارٍ تحميل المنتجات...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && items.length === 0 && <p>لا توجد منتجات متاحة حاليًا.</p>}
      <div className="product-grid">{items.map((product) => <article className="product-card" key={product.id}><div className="product-image">{product.image ? <img src={product.image} alt={product.name} /> : <span>سوقي</span>}</div><div className="product-card-body"><h2>{product.name}</h2><p>{product.description || 'منتج مميز من متاجر سوقي'}</p><strong>{Number(product.price).toFixed(2)} ر.س</strong><Link className="secondary-button" to={`/products/${product.id}`}>التفاصيل</Link></div></article>)}</div>
    </section>
  </main>;
}
