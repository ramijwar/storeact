import { Link, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import { ProtectedRoute, RoleRoute } from './components/RouteGuards';
import AccountLayout from './layouts/AccountLayout';
import MerchantLayout from './layouts/MerchantLayout';
import AdminLayout from './layouts/AdminLayout';
import AccountHomePage from './pages/AccountHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import MerchantDashboardPage from './pages/MerchantDashboardPage';
import MerchantProductsPage from './pages/MerchantProductsPage';
import MerchantProductFormPage from './pages/MerchantProductFormPage';
import MerchantOrdersPage from './pages/MerchantOrdersPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminStoresPage from './pages/AdminStoresPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const Placeholder = ({ title }: { title: string }) => <section className="panel"><h1>{title}</h1><p>هذه الصفحة قيد التجهيز.</p></section>;
const Home = () => <main className="page-shell"><section className="hero-card"><p className="eyebrow">منصة التجارة متعددة المتاجر</p><h1>مرحبًا بك في سوقي</h1><p>اكتشف منتجات المتاجر المحلية واطلبها بسهولة.</p><Link className="primary-button" to="/products">تصفح المنتجات</Link></section></main>;
const Success = () => <main className="page-shell"><section className="panel success"><h1>تم استلام طلبك</h1><p>شكرًا لك. سنعمل على تجهيز طلبك.</p><Link className="primary-button" to="/products">متابعة التسوق</Link></section></main>;

export default function App() {
  const user = useAuthStore((state) => state.user);
  return <div className="app" dir="rtl"><header className="site-header"><Link className="brand" to="/">سوقي</Link><nav><Link to="/">الرئيسية</Link><Link to="/products">المنتجات</Link><Link to="/cart">السلة</Link>{user ? <Link to="/account">حسابي</Link> : <><Link to="/login">دخول</Link><Link to="/register">تسجيل</Link></>}</nav></header><Routes><Route path="/" element={<Home />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/order-success" element={<Success />} /><Route path="/login" element={<LoginPage />} /><Route path="/register" element={<RegisterPage />} /><Route element={<ProtectedRoute />}><Route path="/account" element={<AccountLayout />}><Route index element={<AccountHomePage />} /><Route path="orders" element={<OrdersPage />} /><Route path="profile" element={<Placeholder title="ملفي الشخصي" />} /></Route><Route element={<RoleRoute roles={['merchant']} />}><Route path="/merchant" element={<MerchantLayout />}><Route index element={<MerchantDashboardPage />} /><Route path="products" element={<MerchantProductsPage />} /><Route path="products/new" element={<MerchantProductFormPage />} /><Route path="orders" element={<MerchantOrdersPage />} /></Route><Route element={<RoleRoute roles={['admin']} />}><Route path="/admin" element={<AdminLayout />}><Route index element={<AdminDashboardPage />} /><Route path="stores" element={<AdminStoresPage />} /><Route path="users" element={<AdminUsersPage />} /><Route path="orders" element={<Placeholder title="إدارة الطلبات" />} /><Route path="categories" element={<AdminCategoriesPage />} /></Route></Route><Route path="*" element={<Placeholder title="الصفحة غير موجودة" />} /></Routes></div>;
}
