import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) { setValidationError('أدخل البريد الإلكتروني وكلمة المرور.'); return; }
    setValidationError('');
    try {
      await login(email.trim(), password);
      const target = (location.state as { from?: string } | null)?.from || '/account';
      navigate(target);
    } catch { /* رسالة الخطأ محفوظة في المتجر */ }
  }

  return <main className="page-shell"><section className="panel auth-panel"><p className="eyebrow">حسابك في سوقي</p><h1>تسجيل الدخول</h1><form onSubmit={submit}><label>البريد الإلكتروني<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label><label>كلمة المرور<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>{(validationError || error) && <p className="error-message">{validationError || error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'جارٍ الدخول...' : 'دخول'}</button></form><p className="auth-footer">ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link></p></section></main>;
}
