// controllers/orderController.js
const Order = require('../models/order');

// create a new order
exports.createOrder = async (req, res) => {
  try {
    // Calculate total price based on products and their quantity
    let totalPrice = req.body.products.reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0);

    // Create new order with calculated total price
    const newOrder = new Order({
      user: req.body.user,
      products: req.body.products,
      totalAmount: totalPrice,
      shippingAddress: req.body.shippingAddress
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error: error.message });

  }
};

// get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      res.status(200).json({ message: 'No orders found' });
    } else {
      res.status(200).json({ message: 'Orders retrieved successfully', orders: orders });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
};


// get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order retrieved successfully', order: order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve order', error: error.message });
  }
};

// update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order: order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};
