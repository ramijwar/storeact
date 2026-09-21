import { useEffect, useState } from 'react';
import type { Product } from '../lib/api';
import { deleteMerchantProduct, getMerchantProducts } from '../lib/merchant-api';

export default function MerchantProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { getMerchantProducts().then((result) => setProducts(Array.isArray(result) ? result : result.data ?? result.products ?? [])).catch((err: Error) => setError(err.message)); }, []);
  async function remove(id: number) { if (!window.confirm('هل تريد حذف هذا المنتج؟')) return; try { await deleteMerchantProduct(id); setProducts((current) => current.filter((product) => product.id !== id)); } catch (err) { setError(err instanceof Error ? err.message : 'تعذر حذف المنتج.'); } }
  return <section className="panel"><h1>منتجات المتجر</h1>{error && <p className="error-message">{error}</p>}{!products.length && !error && <p>لا توجد منتجات متاحة.</p>}<div className="orders-list">{products.map((product) => <article className="order-card" key={product.id}><div><strong>{product.name}</strong><p>{Number(product.price).toFixed(2)} ر.س · المخزون: {product.stock ?? '—'}</p></div><button className="link-button" onClick={() => remove(product.id)}>حذف</button></article>)}</div></section>;
}
