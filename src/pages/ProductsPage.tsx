import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

export function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error loading products: {error.message}</div>;
  }

  return (
    <div className="products-page">
      <h1>Our Sneakers</h1>
      <h2>All items</h2>
      <div className="products-grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            {/* <img src={product.image} alt={`Photo of ${product.name}`} /> */}
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <p className="brand">{product.brand}</p>
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
