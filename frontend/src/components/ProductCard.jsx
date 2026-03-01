import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const price = product.offerPrice || product.price;

  return (
    <article className="card">
      <img src={product.images?.[0]} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>{price} دج</p>
      <Link className="btn" to={`/products/${product.slug}`}>عرض التفاصيل</Link>
    </article>
  );
};

export default ProductCard;
