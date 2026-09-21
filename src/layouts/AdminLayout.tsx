import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return <main className="page-shell dashboard-layout"><aside className="dashboard-sidebar"><p className="eyebrow">إدارة المنصة</p><strong>لوحة المدير</strong><nav><Link to="/admin">النظرة العامة</Link><Link to="/admin/stores">المتاجر</Link><Link to="/admin/users">المستخدمون</Link><Link to="/admin/orders">الطلبات</Link><Link to="/admin/categories">التصنيفات</Link></nav></aside><section className="dashboard-content"><Outlet /></section></main>;
}
