// app.js

const express = require('express');
const mongoose = require('mongoose');

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const commentRoutes = require('./routes/commentRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB 
mongoose.connect('mongodb+srv://nkhanpara9106:4FZHlWK1rUKcxlXP@webassignment4.x77wjeh.mongodb.net/WebAssignment4', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'NidhiWebAssignment4'
});

// Middleware
app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
