import { Link, Route, Routes } from 'react-router-dom';

function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">منصة التجارة متعددة المتاجر</p>
        <h1>مرحبًا بك في سوقي</h1>
        <p>واجهة المتجر قيد التجهيز، وستتصل قريبًا بواجهة PHP API الحالية.</p>
        <Link className="primary-button" to="/products">تصفح المنتجات</Link>
      </section>
    </main>
  );
}

function ProductsPage() {
  return (
    <main className="page-shell">
      <section className="panel">
        <h1>المنتجات</h1>
        <p>سيتم تحميل المنتجات من:</p>
        <code>https://t3lam.site/storeact/api</code>
      </section>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-shell">
      <section className="panel">
        <h1>الصفحة غير موجودة</h1>
        <Link to="/">العودة للرئيسية</Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="app" dir="rtl">
      <header className="site-header">
        <Link className="brand" to="/">سوقي</Link>
        <nav aria-label="التنقل الرئيسي">
          <Link to="/">الرئيسية</Link>
          <Link to="/products">المنتجات</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
