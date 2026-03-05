const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Category = require('./category'); // Importamos la categoría para relacionarlas

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen_url: {
        type: DataTypes.STRING
    }
});



module.exports = Product;