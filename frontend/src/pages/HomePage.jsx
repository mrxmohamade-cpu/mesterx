import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/products?featured=true').then((res) => setFeatured(res.data)).catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div>
          <h1>متجر عصري لبيع الملابس ومنتجات مميزة</h1>
          <p>جودة عالية - توصيل سريع - الدفع عند الاستلام فقط</p>
          <Link className="btn" to="/products">تصفح المنتجات</Link>
        </div>
      </section>

      <section className="section">
        <h2>منتجات مميزة</h2>
        <div className="grid">
          {featured.map((item) => <ProductCard key={item._id} product={item} />)}
        </div>
      </section>
    </>
  );
};

export default HomePage;
