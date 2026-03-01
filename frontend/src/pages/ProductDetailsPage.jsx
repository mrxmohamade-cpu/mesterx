import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', state: '', notes: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/products/${slug}`).then((res) => {
      setProduct(res.data);
      setSelectedSize(res.data.sizes?.[0] || '');
      setSelectedColor(res.data.colors?.[0] || '');
    });
  }, [slug]);

  const submitOrder = async (e) => {
    e.preventDefault();
    const payload = { ...form, selectedSize, selectedColor, productId: product._id };
    const res = await api.post('/orders', payload);
    setMessage(`${res.data.message} - رقم الطلب: ${res.data.orderId}`);
  };

  if (!product) return <p>جاري التحميل...</p>;

  return (
    <section className="section product-details">
      <div>
        <img src={product.images?.[0]} alt={product.name} className="product-main-image" />
        <div className="thumbs">
          {product.images?.map((img) => <img key={img} src={img} alt={product.name} />)}
        </div>
      </div>

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">{product.offerPrice || product.price} دج</p>

        <label>المقاس</label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          {product.sizes?.map((size) => <option key={size}>{size}</option>)}
        </select>

        <label>اللون</label>
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          {product.colors?.map((color) => <option key={color}>{color}</option>)}
        </select>

        <form className="order-form" onSubmit={submitOrder}>
          <h3>اطلب الآن (الدفع عند الاستلام)</h3>
          <input required placeholder="الاسم" onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))} />
          <input required placeholder="اللقب" onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))} />
          <input required placeholder="رقم الهاتف" onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          <input required placeholder="الولاية" onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
          <textarea placeholder="ملاحظات إضافية (اختياري)" onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          <button className="btn" type="submit">إرسال الطلب</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
