import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cart.store';

export default function CartPage() {
  const { items, remove, setQuantity, total } = useCartStore();
  if (!items.length) return <main className="page-shell"><section className="panel"><h1>السلة فارغة</h1><p>أضف منتجات للبدء.</p><Link className="primary-button" to="/products">تصفح المنتجات</Link></section></main>;
  return <main className="page-shell"><section className="panel"><h1>سلة المشتريات</h1><div className="cart-list">{items.map((item) => <div className="cart-row" key={item.id}><div><h2>{item.name}</h2><p>{Number(item.price).toFixed(2)} ر.س</p></div><div className="quantity-row"><button onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button></div><button className="link-button" onClick={() => remove(item.id)}>حذف</button></div>)}</div><div className="cart-summary"><strong>الإجمالي: {total().toFixed(2)} ر.س</strong><Link className="primary-button" to="/checkout">إتمام الطلب</Link></div></section></main>;
}
