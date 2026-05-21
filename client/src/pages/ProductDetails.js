import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import getUser from '../utils/getUser';

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);

        setProduct(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = async () => {

  const user = getUser();

  if (!user) {
    window.location.href = '/login';
    return;
  }

  try {

    await API.post(`/carts/${user.id}`, {
      product_id: product.id,
      quantity: 1
    });

    alert('Added to cart');

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Image Placeholder */}
      <div
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}
      >
        Product Image
      </div>

      {/* Product Name */}
      <h1>{product.name}</h1>

      {/* Description */}
      <p>{product.description}</p>

      {/* Price */}
      <h2>${product.price}</h2>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>
        Add To Cart
      </button>

    </div>
  );
}

export default ProductDetails;