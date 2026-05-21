import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>

          <Link to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>

          <p>${product.price}</p>

        </div>
      ))}
    </div>
  );
}

export default Products;