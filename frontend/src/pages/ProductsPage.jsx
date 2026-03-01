import { useEffect, useState } from 'react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ sort: 'latest', minPrice: '', maxPrice: '', category: '', size: '', color: '' });

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => value && params.append(key, value));
    api.get(`/products?${params.toString()}`).then((res) => setProducts(res.data)).catch(() => setProducts([]));
  }, [filters]);

  return (
    <section className="section">
      <h1>كل المنتجات</h1>
      <div className="filters">
        <input placeholder="أقل سعر" onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))} />
        <input placeholder="أعلى سعر" onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))} />
        <select onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}>
          <option value="">كل الأقسام</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input placeholder="المقاس" onChange={(e) => setFilters((p) => ({ ...p, size: e.target.value }))} />
        <input placeholder="اللون" onChange={(e) => setFilters((p) => ({ ...p, color: e.target.value }))} />
        <select onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}>
          <option value="latest">الأحدث</option>
          <option value="priceAsc">السعر: من الأقل للأعلى</option>
          <option value="priceDesc">السعر: من الأعلى للأقل</option>
        </select>
      </div>

      <div className="grid">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
};

export default ProductsPage;
