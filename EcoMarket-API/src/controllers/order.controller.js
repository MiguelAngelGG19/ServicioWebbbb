const { Order, Product, OrderItem } = require('../models/associations');
const { sequelize } = require('../config/database');

exports.createOrder = async (req, res) => {
    // Iniciamos una Transacción (ACID)
    const t = await sequelize.transaction();

    try {
        const { items } = req.body; // El cliente envía: [{ productId: 1, cantidad: 2}, ...]
        const userId = req.user.id; // Viene del token de autenticación
        
        let totalOrden = 0;
        const itemsParaCrear = [];

        // 1. Iterar sobre los productos solicitados
        for (const item of items) {
            const productoDB = await Product.findByPk(item.productId, { transaction: t });
            
            if (!productoDB) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }
            
            // 2. Verificar Stock
            if (productoDB.stock < item.cantidad) {
                throw new Error(`Stock insuficiente para: ${productoDB.nombre}`);
            }

            // 3. Calcular subtotal y restar stock
            totalOrden += productoDB.precio * item.cantidad;

            // Restamos stock (dentro de la transacción)
            await productoDB.update({
                stock: productoDB.stock - item.cantidad
            }, { transaction: t });

            // Preparamos el objeto para OrderItem
            itemsParaCrear.push({
                cantidad: item.cantidad,
                precio_unitario: productoDB.precio, // Precio congelado
                ProductId: productoDB.id // Llave foránea del producto
            });
        }

        // 4. Crear la Cabecera de la Orden
        const nuevaOrden = await Order.create({
            total: totalOrden,
            UserId: userId,
            estado: 'completado'
        }, { transaction: t });

        // 5. Crear los Detalles (Items) vinculados a la Orden
        for (const itemData of itemsParaCrear) {
            await OrderItem.create({
                ...itemData,
                OrderId: nuevaOrden.id // Llave foránea de la orden
            }, { transaction: t });
        }

        // 6. Confirmar Transacción (COMMIT)
        await t.commit();
        
        res.status(201).json({
            success: true,
            message: "Compra realizada",
            orderId: nuevaOrden.id,
            total: totalOrden
        });

    } catch (error) {
        // 7. Si algo falló, deshacer todo (ROLLBACK)
        await t.rollback();
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Historial de compras del usuario
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { UserId: req.user.id },
            include: {
                model: Product,
                through: { attributes: ['cantidad', 'precio_unitario'] } // Traer datos de la tabla pivote
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};