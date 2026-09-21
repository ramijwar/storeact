import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, type Product } from '../lib/api';
import { useCartStore } from '../stores/cart.store';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const add = useCartStore((state) => state.add);
  useEffect(() => { if (id) getProduct(Number(id)).then(setProduct).catch((err: Error) => setError(err.message)); }, [id]);
  if (error) return <main className="page-shell"><section className="panel error-message">{error}</section></main>;
  if (!product) return <main className="page-shell"><section className="panel">جارٍ تحميل المنتج...</section></main>;
  return <main className="page-shell"><section className="detail-card"><div className="detail-image">{product.image ? <img src={product.image} alt={product.name} /> : 'سوقي'}</div><div><p className="eyebrow">{product.store_name || 'متجر سوقي'}</p><h1>{product.name}</h1><p>{product.description || 'لا يوجد وصف لهذا المنتج.'}</p><strong className="price">{Number(product.price).toFixed(2)} ر.س</strong><div className="quantity-row"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)}>+</button></div><button className="primary-button" onClick={() => add(product, quantity)}>أضف إلى السلة</button><Link className="secondary-button" to="/cart">الذهاب إلى السلة</Link></div></section></main>;
}
