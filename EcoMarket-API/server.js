require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize, testConnection } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// ── Trust Proxy: necesario para leer la IP real del cliente ──────────────────
app.set('trust proxy', true);

// Importar Rutas
const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
require('./src/models/associations');
const orderRoutes = require('./src/routes/order.routes');

// 1. Middlewares (Configuración Global)
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// CORS: Permite React Web, app móvil (192.168.x.x y 10.x.x.x)
const origenesPermitidos = [
    'http://localhost:5173',
    'http://localhost:3000',
];

app.use(cors({
    origin: function(origin, callback) {
        if (
            !origin ||
            origenesPermitidos.includes(origin) ||
            /^http:\/\/192\.168\./.test(origin) ||
            /^http:\/\/10\./.test(origin)
        ) {
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

        // Solo sincronizar tablas en desarrollo (evita lentitud innecesaria)
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ force: false });
            console.log('📦 Tablas sincronizadas correctamente.');
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`🌐 Accesible en red local: http://10.251.57.129:${PORT}`);
        });
    } catch (error) {
        console.error('💀 Error fatal al iniciar el servicio:', error);
    }
};

startServer();
