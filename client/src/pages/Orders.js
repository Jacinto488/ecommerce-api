import { useEffect, useState } from 'react';
import API from '../services/api';
import getUser from '../utils/getUser';

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const user = getUser();

        const res = await API.get(
          `/orders/${user.id}`
        );

        setOrders(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();

  }, []);

  return (
    <div style={{ padding: '20px' }}>

      <h1>Order History</h1>

      {orders.length === 0 ? (

        <p>No orders found</p>

      ) : (

        orders.map(order => (

          <div
            key={order.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '20px'
            }}
          >

            <h2>Order #{order.id}</h2>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Date:</strong>{' '}
              {new Date(order.created_at)
                .toLocaleDateString()}
            </p>

            <h3>Items:</h3>

            {order.items.map((item, index) => (

              <div key={index}>

                <p>
                  {item.name} x{item.quantity}
                </p>

                <p>${item.price}</p>

              </div>
            ))}

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;