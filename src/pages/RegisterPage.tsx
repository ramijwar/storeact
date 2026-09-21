import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../lib/api';
import { useAuthStore } from '../stores/auth.store';

export default function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 6) { setError('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.'); return; }
    setLoading(true); setError('');
    try { await register({ name: name.trim(), email: email.trim(), password }); await login(email.trim(), password); navigate('/account'); }
    catch (err) { setError(err instanceof Error ? err.message : 'تعذر إنشاء الحساب.'); }
    finally { setLoading(false); }
  }
  return <main className="page-shell"><section className="panel auth-panel"><p className="eyebrow">انضم إلى سوقي</p><h1>إنشاء حساب</h1><form onSubmit={submit}><label>الاسم<input value={name} onChange={(event) => setName(event.target.value)} required /></label><label>البريد الإلكتروني<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>كلمة المرور<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required /></label>{error && <p className="error-message">{error}</p>}<button className="primary-button" disabled={loading}>{loading ? 'جارٍ الإنشاء...' : 'إنشاء الحساب'}</button></form><p className="auth-footer">لديك حساب؟ <Link to="/login">تسجيل الدخول</Link></p></section></main>;
}
