export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#1a1a2e', color: '#aaa', padding: '40px 24px 20px' }}>
            <div style={{
                maxWidth: 1200, margin: '0 auto',
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 40, marginBottom: 30
            }}>
                <div>
                    <h3 style={{ color: '#3483fa', marginTop: 0 }}>🌿 EcoMarket</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                        Tu tienda online de confianza. Productos de calidad con envío rápido.
                    </p>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginTop: 0 }}>Navegación</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                        <li style={{ marginBottom: 8 }}><a href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Inicio</a></li>
                        <li style={{ marginBottom: 8 }}><a href="/carrito" style={{ color: '#aaa', textDecoration: 'none' }}>Mi Carrito</a></li>
                        <li style={{ marginBottom: 8 }}><a href="/mis-compras" style={{ color: '#aaa', textDecoration: 'none' }}>Mis Compras</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginTop: 0 }}>Contacto</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
                        📧 soporte@ecomarket.com<br />
                        📞 +52 555 123 4567<br />
                        📍 Tehuacán, Puebla, MX
                    </p>
                </div>
            </div>
            <div style={{ borderTop: '1px solid #2a2a4a', paddingTop: 20, textAlign: 'center', fontSize: '0.85rem' }}>
                © 2026 EcoMarket. Todos los derechos reservados. — Hecho con 💙 en México
            </div>
        </footer>
    );
}
