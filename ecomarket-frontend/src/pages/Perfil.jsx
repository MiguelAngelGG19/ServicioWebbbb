import React from 'react';

// ✅ Agrega "default"
export default function Perfil() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2 style={{ color: '#3b82f6' }}>Mi Perfil Privado</h2>
            <p style={{ color: '#94a3b8' }}>Esta es una ruta protegida. Solo puedes ver esto si iniciaste sesión.</p>
        </div>
    );
}