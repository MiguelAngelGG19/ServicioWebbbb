require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize, testConnection } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Importar Rutas
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
require('./src/models/associations'); 
const orderRoutes = require('./src/routes/order.routes');

// 1. Middlewares (Configuración Global)
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// AQUI ESTA EL CAMBIO IMPORTANTE: CONFIGURACION DE CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permite que React se conecte
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permite el envío de cookies/tokens
}));

app.use(express.json()); 

// 2. CARPETA PÚBLICA DE IMÁGENES
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 4. Ruta de Prueba
app.get('/', (req, res) => {
    res.json({
        status: "API Online",
        engine: "MySQL/Sequelize",
        version: "1.0.0"
    });
});

// 5. Inicialización del Sistema
const startServer = async () => {
    try {
        await testConnection();
        await sequelize.sync({ force: false });
        console.log('📦 Tablas sincronizadas correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('💀 Error fatal al iniciar el servicio:', error);
    }
};

startServer();