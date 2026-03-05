const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');
const { protect, authorizeRoles } = require('../middlewares/auth.middleware');

// Rutas Públicas (Cualquiera puede ver)
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Rutas Privadas (Solo Admin puede crear/eliminar)
router.post('/', protect, authorizeRoles('admin'), upload.single('imagen'), productController.createProduct);
router.delete('/:id', protect, authorizeRoles('admin'), productController.deleteProduct);

module.exports = router;