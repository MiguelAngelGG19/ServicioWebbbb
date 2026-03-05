const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno

// Crear la instancia de conexión usando los datos del .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false // Pon true si quieres ver las queries SQL en consola
    }
);

// Función asíncrona para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión establecida con la Base de Datos.');
    } catch (error) {
        console.error('❌ Error al conectar con la Base de Datos:', error);
    }
};

module.exports = { sequelize, testConnection }; 