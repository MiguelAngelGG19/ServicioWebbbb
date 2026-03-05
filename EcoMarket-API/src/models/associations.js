const User = require('./user'); 
const Product = require('./product');
const Category = require('./category'); // <-- Importación de la Categoría
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// 1. Relación: Categoría <-> Producto (Uno a Muchos)
Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

// 2. Relación: Usuario <-> Orden (Uno a Muchos)
User.hasMany(Order);
Order.belongsTo(User);

// 3. Relación: Orden <-> Producto (Muchos a Muchos a través de OrderItem)
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// Exportación centralizada de todos los modelos
module.exports = { User, Product, Category, Order, OrderItem };