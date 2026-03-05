// src/models/associations.js
const User = require('./user'); 
const Product = require('./product');
const Category = require('./category'); 
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// 1. Relación: Categoría <-> Producto
Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

// 2. Relación: Usuario <-> Orden
// Especificamos la foreignKey para estar seguros
User.hasMany(Order, { foreignKey: 'UserId' }); 
Order.belongsTo(User, { foreignKey: 'UserId' });

// 3. Relación: Orden <-> Producto (Muchos a Muchos)
// ESTO ES LO CRÍTICO:
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'OrderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'ProductId' });

module.exports = { User, Product, Category, Order, OrderItem };