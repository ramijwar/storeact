import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export default function AccountLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return <main className="page-shell account-layout"><aside className="account-sidebar"><p className="eyebrow">حساب العميل</p><strong>{user?.name || user?.email}</strong><nav><Link to="/account">نظرة عامة</Link><Link to="/account/orders">طلباتي</Link><Link to="/account/profile">ملفي الشخصي</Link><button className="link-button" onClick={logout}>تسجيل الخروج</button></nav></aside><section className="account-content"><Outlet /></section></main>;
}
