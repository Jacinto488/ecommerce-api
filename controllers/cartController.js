const pool = require('../config/db');

// Get a user's cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartResult = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    if (cartResult.rows.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartId = cartResult.rows[0].id;
    const itemsResult = await pool.query(
      `SELECT ci.id, ci.product_id, p.name, p.price, ci.quantity 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    res.json({ cart: cartResult.rows[0], items: itemsResult.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    // Get or create cart
    let cartResult = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    let cartId;
    if (cartResult.rows.length === 0) {
      cartResult = await pool.query('INSERT INTO carts(user_id) VALUES($1) RETURNING *', [userId]);
    }
    cartId = cartResult.rows[0].id;

    // Check if product already in cart
    const existing = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );

    if (existing.rows.length > 0) {
      // Update quantity
      const updated = await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
        [quantity, cartId, productId]
      );
      return res.json(updated.rows[0]);
    }

    // Insert new item
    const result = await pool.query(
      'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1,$2,$3) RETURNING *',
      [cartId, productId, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const result = await pool.query(
      'UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *',
      [quantity, cartItemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;

    await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};