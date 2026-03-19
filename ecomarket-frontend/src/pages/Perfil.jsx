export default function Perfil() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 30,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                {/* AVATAR */}
                <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#FFE600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    margin: '0 auto 20px'
                }}>
                    👤
                </div>

                <h2 style={{ margin: '0 0 6px', color: '#333' }}>
                    {user.nombre || 'Usuario'}
                </h2>

                <span style={{
                    display: 'inline-block',
                    backgroundColor: user.rol === 'admin' ? '#fef3c7' : '#eff6ff',
                    color: user.rol === 'admin' ? '#d97706' : '#3483fa',
                    padding: '4px 14px',
                    borderRadius: 20,
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    marginBottom: 24
                }}>
                    {user.rol === 'admin' ? '⚙️ Administrador' : '🛍️ Cliente'}
                </span>

                <div style={{
                    backgroundColor: '#f9fafb',
                    borderRadius: 8,
                    padding: 16,
                    textAlign: 'left'
                }}>
                    <p style={{ margin: '0 0 10px', color: '#555', fontSize: '0.95rem' }}>
                        <strong>ID:</strong> #{user.id}
                    </p>
                    <p style={{ margin: '0 0 10px', color: '#555', fontSize: '0.95rem' }}>
                        <strong>Nombre:</strong> {user.nombre}
                    </p>
                    <p style={{ margin: 0, color: '#555', fontSize: '0.95rem' }}>
                        <strong>Rol:</strong> {user.rol}
                    </p>
                </div>

                <a href="/mis-compras" style={{
                    display: 'block',
                    marginTop: 20,
                    padding: '12px',
                    backgroundColor: '#FFE600',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: 6,
                    fontWeight: 'bold'
                }}>
                    📦 Ver mis compras
                </a>
            </div>
        </div>
    );
}
