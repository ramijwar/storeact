import { Link, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function HomePage() {
  return <main className="page-shell"><section className="hero-card"><p className="eyebrow">منصة التجارة متعددة المتاجر</p><h1>مرحبًا بك في سوقي</h1><p>اكتشف منتجات المتاجر المحلية واطلبها بسهولة.</p><div className="hero-actions"><Link className="primary-button" to="/products">تصفح المنتجات</Link><Link className="secondary-button" to="/cart">السلة</Link></div></section></main>;
}

function SuccessPage() {
  return <main className="page-shell"><section className="panel success"><h1>تم استلام طلبك</h1><p>شكرًا لك. سنعمل على تجهيز طلبك.</p><Link className="primary-button" to="/products">متابعة التسوق</Link></section></main>;
}

function NotFoundPage() {
  return <main className="page-shell"><section className="panel"><h1>الصفحة غير موجودة</h1><Link to="/">العودة للرئيسية</Link></section></main>;
}

export default function App() {
  return <div className="app" dir="rtl"><header className="site-header"><Link className="brand" to="/">سوقي</Link><nav aria-label="التنقل الرئيسي"><Link to="/">الرئيسية</Link><Link to="/products">المنتجات</Link><Link to="/cart">السلة</Link></nav></header><Routes><Route path="/" element={<HomePage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/order-success" element={<SuccessPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></div>;
}
