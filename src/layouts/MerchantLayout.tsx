import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export default function MerchantLayout() {
  const user = useAuthStore((state) => state.user);
  return <main className="page-shell dashboard-layout"><aside className="dashboard-sidebar"><p className="eyebrow">لوحة التاجر</p><strong>{user?.name || 'متجري'}</strong><nav><Link to="/merchant">النظرة العامة</Link><Link to="/merchant/products">المنتجات</Link><Link to="/merchant/products/new">إضافة منتج</Link><Link to="/merchant/orders">الطلبات</Link></nav></aside><section className="dashboard-content"><Outlet /></section></main>;
}
