import { useEffect, useState } from 'react';
import API from '../services/api';
const userId = 1; // replace later with auth user

function Cart() {
  const [cart, setCart] = useState([]);

  const userId = 1; // replace later with auth user

  useEffect(() => {
    API.get(`/carts/${userId}`).then(res => setCart(res.data.items));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name} - {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

const handleCheckout = async () => {
  await API.post(`/carts/${userId}/checkout`);
  alert("Order placed!");
};

<button onClick={handleCheckout}>Checkout</button>

export default Cart;