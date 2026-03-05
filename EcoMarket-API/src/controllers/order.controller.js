// src/controllers/order.controller.js
const { Order, Product, OrderItem } = require('../models/associations');
const { sequelize } = require('../config/database');

exports.createOrder = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { items } = req.body; 
        const userId = req.user.id; 

        let totalOrden = 0;
        // En lugar de guardar un objeto genérico, guardaremos la instancia del producto
        // y la información extra (cantidad, precio)
        const productosParaOrden = []; 

        for (const item of items) {
            const productoDB = await Product.findByPk(item.productId, { transaction: t });

            if (!productoDB) {
                throw new Error(`Producto con ID ${item.productId} no encontrado`);
            }

            if (productoDB.stock < item.cantidad) {
                throw new Error(`Stock insuficiente para: ${productoDB.nombre}`);
            }

            totalOrden += productoDB.precio * item.cantidad;

            await productoDB.update({
                stock: productoDB.stock - item.cantidad
            }, { transaction: t });

            // Guardamos la instancia de Sequelize y los datos de la tabla intermedia
            productosParaOrden.push({
                producto: productoDB,
                cantidad: item.cantidad,
                precio_unitario: productoDB.precio 
            });
        }

        const nuevaOrden = await Order.create({
            total: totalOrden,
            UserId: userId,
            estado: 'completado'
        }, { transaction: t });

        // EL CAMBIO ESTÁ AQUÍ: Usamos el método mágico addProduct (o addProducts)
        // Para cada producto, lo vinculamos a la orden pasando los datos extra de la tabla pivote
        for (const p of productosParaOrden) {
             await nuevaOrden.addProduct(p.producto, {
                 through: { 
                     cantidad: p.cantidad, 
                     precio_unitario: p.precio_unitario 
                 },
                 transaction: t
             });
        }

        await t.commit();

        res.status(201).json({
            success: true,
            message: "Compra realizada",
            orderId: nuevaOrden.id,
            total: totalOrden
        });

    } catch (error) {
        await t.rollback();
        res.status(400).json({
            success: false,
            error: error.message
        });
    }

    // 👉 ESTA ES LA FUNCIÓN QUE FALTABA 👈
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { UserId: req.user.id },
            include: {
                model: Product,
                through: { attributes: ['cantidad', 'precio_unitario'] } 
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
};