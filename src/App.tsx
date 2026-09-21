import { Link, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import { ProtectedRoute, RoleRoute } from './components/RouteGuards';
import AccountLayout from './layouts/AccountLayout';
import AccountHomePage from './pages/AccountHomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function HomePage() { return <main className="page-shell"><section className="hero-card"><p className="eyebrow">منصة التجارة متعددة المتاجر</p><h1>مرحبًا بك في سوقي</h1><p>اكتشف منتجات المتاجر المحلية واطلبها بسهولة.</p><div className="hero-actions"><Link className="primary-button" to="/products">تصفح المنتجات</Link><Link className="secondary-button" to="/cart">السلة</Link></div></section></main>; }
function SuccessPage() { return <main className="page-shell"><section className="panel success"><h1>تم استلام طلبك</h1><p>شكرًا لك. سنعمل على تجهيز طلبك.</p><Link className="primary-button" to="/products">متابعة التسوق</Link></section></main>; }
function PlaceholderPage({ title }: { title: string }) { return <section className="panel"><h1>{title}</h1><p>هذه الصفحة قيد التجهيز.</p></section>; }
function NotFoundPage() { return <main className="page-shell"><section className="panel"><h1>الصفحة غير موجودة</h1><Link to="/">العودة للرئيسية</Link></section></main>; }

export default function App() {
  const user = useAuthStore((state) => state.user);
  return <div className="app" dir="rtl"><header className="site-header"><Link className="brand" to="/">سوقي</Link><nav aria-label="التنقل الرئيسي"><Link to="/">الرئيسية</Link><Link to="/products">المنتجات</Link><Link to="/cart">السلة</Link>{user ? <Link to="/account">حسابي</Link> : <Link to="/login">دخول</Link>}</nav></header><Routes><Route path="/" element={<HomePage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/order-success" element={<SuccessPage />} /><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedRoute />}><Route path="/account" element={<AccountLayout />}><Route index element={<AccountHomePage />} /><Route path="orders" element={<PlaceholderPage title="طلباتي" />} /><Route path="profile" element={<PlaceholderPage title="ملفي الشخصي" />} /></Route><Route element={<RoleRoute roles={['merchant']} />}><Route path="/merchant" element={<PlaceholderPage title="لوحة التاجر" />} /></Route><Route element={<RoleRoute roles={['admin']} />}><Route path="/admin" element={<PlaceholderPage title="لوحة المدير" />} /></Route></Route><Route path="*" element={<NotFoundPage />} /></Routes></div>;
}
