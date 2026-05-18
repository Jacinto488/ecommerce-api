const pool = require('../config/db');

exports.checkoutCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    // 1️⃣ Validate cart
    const cartResult = await pool.query('SELECT * FROM carts WHERE id = $1', [cartId]);
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const userId = cartResult.rows[0].user_id;

    // 2️⃣ Get cart items
    const itemsResult = await pool.query(
      `SELECT ci.product_id, p.price, ci.quantity
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    if (itemsResult.rows.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 3️⃣ Simulate payment processing
    const paymentSuccess = true; // For now, always succeed
    if (!paymentSuccess) {
      return res.status(402).json({ message: 'Payment failed' });
    }

    // 4️⃣ Calculate total
    const total = itemsResult.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 5️⃣ Create order
    const orderResult = await pool.query(
      'INSERT INTO orders(user_id, total) VALUES($1,$2) RETURNING *',
      [userId, total]
    );
    const orderId = orderResult.rows[0].id;

    // 6️⃣ Add order_items
    const orderItemsPromises = itemsResult.rows.map(item => {
      return pool.query(
        'INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1,$2,$3,$4)',
        [orderId, item.product_id, item.quantity, item.price]
      );
    });
    await Promise.all(orderItemsPromises);

    // 7️⃣ Empty cart
    await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    res.json({
      message: 'Checkout successful',
      order: orderResult.rows[0],
      items: itemsResult.rows,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during checkout' });
  }
};