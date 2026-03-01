import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const statuses = [
  { value: 'new', label: 'طلب جديد' },
  { value: 'contacted', label: 'تم الاتصال بالزبون' },
  { value: 'confirmed', label: 'تم تأكيد الطلب' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'delivered', label: 'تم التسليم' },
  { value: 'cancelled', label: 'ملغي' }
];

const AdminDashboardPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, cancelled: 0 });
  const [phoneSearch, setPhoneSearch] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', sizes: '', colors: '', images: '' });

  const loadData = async () => {
    const [ordersRes, productsRes, categoriesRes, statsRes] = await Promise.all([
      api.get('/orders', { params: { phone: phoneSearch } }),
      api.get('/products?active=all'),
      api.get('/categories'),
      api.get('/orders/stats/summary')
    ]);
    setOrders(ordersRes.data);
    setProducts(productsRes.data);
    setCategories(categoriesRes.data);
    setStats(statsRes.data);
  };

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const createCategory = async (e) => {
    e.preventDefault();
    await api.post('/categories', { name: newCategory });
    setNewCategory('');
    loadData();
  };

  const createProduct = async (e) => {
    e.preventDefault();
    await api.post('/products', {
      ...newProduct,
      price: Number(newProduct.price),
      sizes: newProduct.sizes.split(',').map((x) => x.trim()),
      colors: newProduct.colors.split(',').map((x) => x.trim()),
      images: newProduct.images.split(',').map((x) => x.trim())
    });
    setNewProduct({ name: '', description: '', price: '', category: '', sizes: '', colors: '', images: '' });
    loadData();
  };

  return (
    <section className="section">
      <div className="admin-topbar">
        <h1>لوحة التحكم</h1>
        <button className="btn ghost" onClick={logout}>تسجيل خروج</button>
      </div>

      <div className="stats">
        <div>إجمالي الطلبات: {stats.total}</div>
        <div>الطلبات المؤكدة: {stats.confirmed}</div>
        <div>الطلبات الملغاة: {stats.cancelled}</div>
      </div>

      <div className="admin-grid">
        <div>
          <h2>إدارة الأقسام</h2>
          <form onSubmit={createCategory} className="order-form">
            <input required value={newCategory} placeholder="اسم القسم" onChange={(e) => setNewCategory(e.target.value)} />
            <button className="btn">إضافة قسم</button>
          </form>
          <ul>{categories.map((c) => <li key={c._id}>{c.name}</li>)}</ul>

          <h2>إضافة منتج</h2>
          <form onSubmit={createProduct} className="order-form">
            <input required placeholder="اسم المنتج" value={newProduct.name} onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))} />
            <textarea required placeholder="الوصف" value={newProduct.description} onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))} />
            <input required placeholder="السعر" value={newProduct.price} onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))} />
            <select required value={newProduct.category} onChange={(e) => setNewProduct((p) => ({ ...p, category: e.target.value }))}>
              <option value="">اختر قسم</option>
              {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
            <input required placeholder="المقاسات (مفصولة بفاصلة)" value={newProduct.sizes} onChange={(e) => setNewProduct((p) => ({ ...p, sizes: e.target.value }))} />
            <input required placeholder="الألوان (مفصولة بفاصلة)" value={newProduct.colors} onChange={(e) => setNewProduct((p) => ({ ...p, colors: e.target.value }))} />
            <input required placeholder="روابط الصور (مفصولة بفاصلة)" value={newProduct.images} onChange={(e) => setNewProduct((p) => ({ ...p, images: e.target.value }))} />
            <button className="btn">إضافة المنتج</button>
          </form>

          <h2>المنتجات</h2>
          <ul>
            {products.map((p) => (
              <li key={p._id}>
                {p.name} - {p.price} دج - {p.isActive ? 'نشط' : 'معطل'}
                <button className="btn ghost" onClick={async () => { await api.patch(`/products/${p._id}/toggle`); loadData(); }}>
                  {p.isActive ? 'تعطيل' : 'تفعيل'}
                </button>
                <button className="btn danger" onClick={async () => { await api.delete(`/products/${p._id}`); loadData(); }}>حذف</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>إدارة الطلبات</h2>
          <div className="search-box">
            <input placeholder="بحث برقم الهاتف" value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} />
            <button className="btn" onClick={loadData}>بحث</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الزبون</th>
                <th>الهاتف</th>
                <th>الولاية</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.productSnapshot?.name}</td>
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order.phone}</td>
                  <td>{order.state}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        await api.patch(`/orders/${order._id}/status`, { status: e.target.value });
                        loadData();
                      }}
                    >
                      {statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
