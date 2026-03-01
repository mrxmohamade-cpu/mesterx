import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <header className="header">
      <div className="container nav">
        <Link to="/" className="logo">MesterX</Link>
        <nav>
          <Link to="/">الرئيسية</Link>
          <Link to="/products">المنتجات</Link>
          <Link to="/admin/login">لوحة التحكم</Link>
        </nav>
      </div>
    </header>
    <main className="container">
      <Outlet />
    </main>
    <footer className="footer">© {new Date().getFullYear()} MesterX - الدفع عند الاستلام</footer>
  </>
);

export default Layout;
