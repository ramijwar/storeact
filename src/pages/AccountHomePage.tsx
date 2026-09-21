import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export default function AccountHomePage() {
  const user = useAuthStore((state) => state.user);
  return <section className="panel"><p className="eyebrow">مرحبًا بعودتك</p><h1>{user?.name || 'حسابي'}</h1><p>من هنا يمكنك متابعة طلباتك وإدارة بيانات حسابك.</p><div className="hero-actions"><Link className="primary-button" to="/account/orders">عرض الطلبات</Link><Link className="secondary-button" to="/products">متابعة التسوق</Link></div></section>;
}
