// src/models/OrderItem.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
    // Quitamos el ID autoincremental, Sequelize usará una clave primaria compuesta
    // formada por OrderId y ProductId gracias a las asociaciones.
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    precio_unitario: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = OrderItem;