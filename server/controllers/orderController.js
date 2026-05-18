const pool = require('../config/db');

// Get all orders for a specific user
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params; // Assume userId is passed in URL

    // Get all orders
    const ordersResult = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    if (ordersResult.rows.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(ordersResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

// Get details for a specific order
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get order
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];

    // Get order items
    const itemsResult = await pool.query(
      `SELECT oi.id, oi.product_id, p.name, p.price, oi.quantity
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [orderId]
    );

    res.json({
      order,
      items: itemsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching order details' });
  }
};