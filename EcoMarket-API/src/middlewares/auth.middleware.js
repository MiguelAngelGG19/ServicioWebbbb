const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

// GUARDIA 1: Verifica si traes el gafete (Token válido)
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findByPk(decoded.id);
            return next(); // Pasa al siguiente filtro o controlador
        } catch (error) {
            return res.status(401).json({ error: 'Token no válido o expirado' });
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, no enviaste token' });
    }
};

// GUARDIA 2 (NUEVO): Verifica si el gafete dice que eres Admin
exports.authorizeRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        // req.user viene del middleware 'protect' previo
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ 
                error: `El rol '${req.user ? req.user.rol : 'desconocido'}' no tiene permiso para realizar esta acción.` 
            });
        }
        next(); // Si el rol está permitido, adelante.
    };
};