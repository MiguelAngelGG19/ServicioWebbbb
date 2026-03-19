const Product = require('../models/product');
const Category = require('../models/category');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize'); // Importante para los filtros

exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, stock, description, CategoryId } = req.body;
        const imagen_url = req.file ? req.file.path : null;

        const newProduct = await Product.create({
            nombre, precio, stock, descripcion: description, imagen_url, CategoryId
        });
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZADO: Obtener productos con Filtros y Paginación
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, minPrice } = req.query;
        const offset = (page - 1) * limit;
        const limitNum = parseInt(limit);

        const whereClause = {};
        if (nombre) {
            whereClause.nombre = { [Op.like]: `%${nombre}%` };
        }
        if (minPrice) {
            whereClause.precio = { [Op.gte]: minPrice };
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            limit: limitNum,
            offset: offset,
            include: Category
        });

        res.json({
            success: true,
            totalItems: count,
            totalPages: Math.ceil(count / limitNum),
            currentPage: parseInt(page),
            data: rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { include: Category });
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// NUEVO: Borrar producto y su imagen física
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

        // Borrar imagen física
        if (product.imagen_url) {
            const imagePath = path.resolve(product.imagen_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.destroy();
        res.json({ success: true, message: 'Producto e imagen eliminados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};