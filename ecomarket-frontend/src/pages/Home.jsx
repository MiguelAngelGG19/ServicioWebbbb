import { ProductList } from '../components/ProductList';

export default function Home() {
    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* BANNER HERO */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '50px 24px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{
                    margin: '0 0 12px 0',
                    fontSize: '2.2rem',
                    fontWeight: '900'
                }}>
                    🌿 Bienvenido a EcoMarket
                </h1>
                <p style={{
                    margin: '0 0 24px 0',
                    fontSize: '1.1rem',
                    opacity: 0.9
                }}>
                    Los mejores productos al mejor precio, con envío gratis
                </p>
                <div style={{
                    display: 'inline-flex',
                    gap: 16
                }}>
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 20px',
                        borderRadius: 20,
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        🚚 Envío gratis
                    </span>
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 20px',
                        borderRadius: 20,
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        🔒 Compra segura
                    </span>
                    <span style={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        padding: '8px 20px',
                        borderRadius: 20,
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        💳 Paga fácil
                    </span>
                </div>
            </div>

            {/* CATÁLOGO */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '30px 24px' }}>
                <h2 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: 24,
                    borderLeft: '4px solid #FFE600',
                    paddingLeft: 12
                }}>
                    Productos disponibles
                </h2>
                <ProductList />
            </div>
        </div>
    );
}
