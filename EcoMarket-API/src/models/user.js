const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    hooks: {
        // HOOK: Antes de crear el usuario, encriptamos la clave
        // saltRounds: 8 en desarrollo (rápido), usar 12 en producción
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(8);
            user.password = await bcrypt.hash(user.password, salt);
        },
        // HOOK: Antes de actualizar, re-encriptar si cambia la contraseña
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(8);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Método personalizado para comparar contraseñas (Login)
User.prototype.compararPassword = async function(passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = User;
