import { useEffect, useState } from 'react';
import API from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = 1;

  useEffect(() => {
    API.get(`/orders/user/${userId}`).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order #{order.id} - ${order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;