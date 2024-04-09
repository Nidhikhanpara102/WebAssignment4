// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define routes
router.post('/create', cartController.createCart);
router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getCartById);
router.put('/:id', cartController.updateCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;
