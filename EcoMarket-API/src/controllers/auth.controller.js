const User = require('../models/user');
const jwt = require('jsonwebtoken');

// ─── Helper: crear token JWT ───────────────────────────────────────────────────
const generarToken = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

// ─── Helper: validar formato de email ─────────────────────────────────────────
const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRO
// ─────────────────────────────────────────────────────────────────────────────
exports.registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Todos los campos son obligatorios: nombre, email y contraseña.'
            });
        }

        // 2. Validar formato de email
        if (!esEmailValido(email)) {
            return res.status(400).json({
                success: false,
                error: 'El formato del correo electrónico no es válido.'
            });
        }

        // 3. Validar longitud mínima del nombre
        if (nombre.trim().length < 2) {
            return res.status(400).json({
                success: false,
                error: 'El nombre debe tener al menos 2 caracteres.'
            });
        }

        // 4. Validar longitud mínima de contraseña
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'La contraseña debe tener al menos 6 caracteres.'
            });
        }

        // 5. Verificar si el email ya está registrado
        const existeUsuario = await User.findOne({ where: { email } });
        if (existeUsuario) {
            return res.status(409).json({
                success: false,
                error: `El correo "${email}" ya está registrado. Intenta iniciar sesión o usa otro correo.`
            });
        }

        // 6. Crear el nuevo usuario
        const nuevoUsuario = await User.create({
            nombre: nombre.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        // 7. Generar token
        const token = generarToken(nuevoUsuario.id, nuevoUsuario.rol);

        return res.status(201).json({
            success: true,
            mensaje: `¡Registro exitoso! Bienvenido/a, ${nuevoUsuario.nombre}.`,
            token,
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        console.error('[registro] Error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor al registrar el usuario. Intenta más tarde.'
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validar campos obligatorios
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'El correo y la contraseña son obligatorios.'
            });
        }

        // 2. Validar formato de email
        if (!esEmailValido(email)) {
            return res.status(400).json({
                success: false,
                error: 'El formato del correo electrónico no es válido.'
            });
        }

        // 3. Buscar usuario por email
        const usuario = await User.findOne({ where: { email: email.toLowerCase().trim() } });
        if (!usuario) {
            return res.status(401).json({
                success: false,
                error: 'No existe ninguna cuenta registrada con ese correo electrónico.'
            });
        }

        // 4. Verificar contraseña
        const esCorrecto = await usuario.compararPassword(password);
        if (!esCorrecto) {
            return res.status(401).json({
                success: false,
                error: 'La contraseña es incorrecta. Verifica tus credenciales e intenta de nuevo.'
            });
        }

        // 5. Generar token
        const token = generarToken(usuario.id, usuario.rol);

        return res.json({
            success: true,
            mensaje: `¡Bienvenido/a de nuevo, ${usuario.nombre}!`,
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('[login] Error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor al iniciar sesión. Intenta más tarde.'
        });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// MI PERFIL
// ─────────────────────────────────────────────────────────────────────────────
exports.miPerfil = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                success: false,
                error: 'No se encontró información del usuario autenticado.'
            });
        }
        return res.json({
            success: true,
            usuario: req.user
        });
    } catch (error) {
        console.error('[miPerfil] Error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Error interno al obtener el perfil.'
        });
    }
};
