const pool = require('../config/db');


// GET USER CART
exports.getCart = async (req, res) => {

  try {

    const { userId } = req.params;

    // Find cart
    let cart = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );

    // No cart yet
    if (cart.rows.length === 0) {
      return res.json({
        items: []
      });
    }

    const cartId = cart.rows[0].id;

    // Get cart items
    const items = await pool.query(`
      SELECT
        cart_items.id,
        products.name,
        products.price,
        cart_items.quantity
      FROM cart_items
      JOIN products
      ON cart_items.product_id = products.id
      WHERE cart_items.cart_id = $1
    `, [cartId]);

    res.json({
      items: items.rows
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};



// ADD TO CART
exports.addToCart = async (req, res) => {

  try {

    const { userId } = req.params;

    const {
      product_id,
      quantity
    } = req.body;

    // Check if user has cart
    let cart = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );

    let cartId;

    // Create cart if none exists
    if (cart.rows.length === 0) {

      const newCart = await pool.query(
        'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
        [userId]
      );

      cartId = newCart.rows[0].id;

    } else {

      cartId = cart.rows[0].id;
    }

    // Check if product already in cart
    const existingItem = await pool.query(
      `SELECT * FROM cart_items
       WHERE cart_id = $1
       AND product_id = $2`,
      [cartId, product_id]
    );

    // Update quantity
    if (existingItem.rows.length > 0) {

      await pool.query(
        `UPDATE cart_items
         SET quantity = quantity + $1
         WHERE cart_id = $2
         AND product_id = $3`,
        [quantity, cartId, product_id]
      );

    } else {

      // Add new item
      await pool.query(
        `INSERT INTO cart_items
        (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)`,
        [cartId, product_id, quantity]
      );
    }

    res.json({
      message: 'Item added to cart'
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};



// CHECKOUT
exports.checkout = async (req, res) => {

  try {

    const { userId } = req.params;

    // Find cart
    const cart = await pool.query(
      'SELECT * FROM carts WHERE user_id = $1',
      [userId]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({
        message: 'Cart not found'
      });
    }

    const cartId = cart.rows[0].id;

    // Get items
    const items = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1',
      [cartId]
    );

    if (items.rows.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    // Create order
    const order = await pool.query(
      `INSERT INTO orders (user_id, status)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, 'Pending']
    );

    const orderId = order.rows[0].id;

    // Move cart items into order_items
    for (const item of items.rows) {

      await pool.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity)
        VALUES ($1, $2, $3)`,
        [
          orderId,
          item.product_id,
          item.quantity
        ]
      );
    }

    // Clear cart
    await pool.query(
      'DELETE FROM cart_items WHERE cart_id = $1',
      [cartId]
    );

    res.json({
      message: 'Checkout successful',
      order
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: 'Server error'
    });
  }
};