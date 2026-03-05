require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path'); // <--- 1. NUEVO: Importar path
const { sequelize, testConnection } = require('./src/config/database');


const app = express();
const PORT = process.env.PORT || 4000;

// Importar Rutas
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes'); // <--- 2. NUEVO: Importar rutas de productos

// Importar Relaciones y Modelos (Para asegurar que Sequelize cree las tablas correctamente)
require('./src/models/associations'); 
const orderRoutes = require('./src/routes/order.routes'); // Importar rutas de órdenes


// 1. Middlewares (Configuración Global)
app.use(helmet()); 
app.use(cors());   
app.use(express.json()); 

// 2. CARPETA PÚBLICA DE IMÁGENES (Vital para ver las fotos)
// Esto permite acceder a: http://localhost:4000/uploads/foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. RUTAS
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <--- 5. NUEVO: Montar ruta de productos
app.use('/api/orders', orderRoutes); // <-- NUEVA RUTA

// 4. Ruta de Prueba (Health Check)
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
        
        // Sincronizar modelos (Crear tablas si no existen)
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