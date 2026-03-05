const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware'); // Importamos el middleware

// Rutas Públicas
router.post('/registro', authController.registro);
router.post('/login', authController.login);

// NUEVO: Ruta Privada para ver el perfil
router.get('/perfil', protect, authController.miPerfil);

module.exports = router;