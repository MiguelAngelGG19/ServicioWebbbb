const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Función auxiliar para crear el token
const generarToken = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // 1. Verificar si ya existe
        const existeUsuario = await User.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // 2. Crear usuario
        const nuevoUsuario = await User.create({ nombre, email, password });

        // 3. Generar token
        const token = generarToken(nuevoUsuario.id, nuevoUsuario.rol);

        res.status(201).json({
            success: true,
            token,
            usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const usuario = await User.findOne({ where: { email } });
        if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

        // 2. Comparar contraseña
        const esCorrecto = await usuario.compararPassword(password);
        if (!esCorrecto) return res.status(401).json({ error: 'Credenciales inválidas' });

        // 3. Generar token
        const token = generarToken(usuario.id, usuario.rol);

        res.json({
            success: true,
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// NUEVO: Endpoint para ver el perfil (Actividad Fase 2)
exports.miPerfil = async (req, res) => {
    // req.user viene del middleware 'protect'
    res.json(req.user);
};