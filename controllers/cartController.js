// controllers/cartController.js
const Cart = require('../models/cart');

// create a new cart
exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).json({ message: 'Item added to cart successfully', cart: newCart });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create cart', error: error.message });
  }
};

// get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (carts.length === 0) {
      res.status(200).json({ message: 'Cart is empty.' });
    } else {
      res.status(200).json({ message: 'Carts items retrieved successfully', carts: carts });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve carts items', error: error.message });
  }
};

// get a single cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty.' });
    }
    res.status(200).json({ message: 'Cart item retrieved successfully', cart: cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve item from the cart', error: error.message });
  }
};

// update a cart
exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty.' });
    }
    res.status(200).json({ message: 'Cart item updated successfully', cart: cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart item', error: error.message });
  }
};

// delete a cart
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty.' });
    }
    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item from the cart', error: error.message });
  }
};
