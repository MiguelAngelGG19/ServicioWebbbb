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

// CORS: Permite React Web (localhost:5173) Y la app móvil (cualquier IP local 192.168.x.x)
app.use(cors({
    origin: function(origin, callback) {
        // Permite: sin origin (Postman), localhost web, e IPs de red local
        if (!origin || origin === 'http://localhost:5173' || /^http:\/\/192\.168\./.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
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
        console.log('\uD83D\uDCE6 Tablas sincronizadas correctamente.');

        app.listen(PORT, () => {
            console.log(`\uD83D\uDE80 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('\uD83D\uDC80 Error fatal al iniciar el servicio:', error);
    }
};

startServer();
