const pool = require('../config/db');


// GET USER ORDERS
exports.getOrders = async (req, res) => {

  try {

    const { userId } = req.params;

    // Get all orders for user
    const orders = await pool.query(
      `SELECT * FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    // Build detailed order data
    const detailedOrders = [];

    for (const order of orders.rows) {

      const items = await pool.query(`
        SELECT
          products.name,
          products.price,
          order_items.quantity
        FROM order_items
        JOIN products
        ON order_items.product_id = products.id
        WHERE order_items.order_id = $1
      `, [order.id]);

      detailedOrders.push({
        ...order,
        items: items.rows
      });
    }

    res.json(detailedOrders);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};



// GET SINGLE ORDER
exports.getOrderById = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [orderId]
    );

    if (order.rows.length === 0) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    const items = await pool.query(`
      SELECT
        products.name,
        products.price,
        order_items.quantity
      FROM order_items
      JOIN products
      ON order_items.product_id = products.id
      WHERE order_items.order_id = $1
    `, [orderId]);

    res.json({
      ...order.rows[0],
      items: items.rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};