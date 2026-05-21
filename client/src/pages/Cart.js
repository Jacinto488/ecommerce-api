import { useEffect, useState } from 'react';
import API from '../services/api';
import getUser from '../utils/getUser';

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const user = getUser();

        const res = await API.get(`/carts/${user.id}`);

        setCartItems(res.data.items || []);

        calculateTotal(res.data.items || []);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();

  }, []);

  const calculateTotal = (items) => {

    let sum = 0;

    items.forEach(item => {
      sum += Number(item.price) * item.quantity;
    });

    setTotal(sum);
  };

  const handleCheckout = async () => {

    try {

      const user = getUser();

      await API.post(`/carts/${user.id}/checkout`);

      alert('Payment successful');

      setCartItems([]);

      setTotal(0);

    } catch (err) {
      console.error(err);

      alert('Checkout failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>

      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (

            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                marginBottom: '10px',
                padding: '10px'
              }}
            >
              <h3>{item.name}</h3>

              <p>Quantity: {item.quantity}</p>

              <p>Price: ${item.price}</p>

            </div>
          ))}

          <h2>Total: ${total.toFixed(2)}</h2>

          <button onClick={handleCheckout}>
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;