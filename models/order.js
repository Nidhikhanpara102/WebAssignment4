// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: String,
  orderDate: { type: Date, default: Date.now }
});

// Recalculate totalAmount before updating
orderSchema.pre('findOneAndUpdate', function(next) {
  
  // Calculate total price based on updated products and their quantity
  let totalPrice = this._update.products.reduce((total, product) => {
    return total + (product.quantity * product.price);
  }, 0);

  // Update totalAmount in the document
  this._update.totalAmount = totalPrice;

  next();
});

module.exports = mongoose.model('Order', orderSchema);
