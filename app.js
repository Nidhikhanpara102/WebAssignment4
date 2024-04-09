// app.js

const express = require('express');
const mongoose = require('mongoose');

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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
