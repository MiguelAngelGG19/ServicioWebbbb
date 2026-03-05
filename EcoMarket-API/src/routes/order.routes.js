const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');

// Todas las rutas de órdenes requieren estar logueado
router.post('/', protect, orderController.createOrder);
router.get('/mis-compras', protect, orderController.getMyOrders);

module.exports = router;