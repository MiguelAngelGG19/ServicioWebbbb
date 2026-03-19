import { ProductList } from '../components/ProductList';

export default function Home() {
    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>

            {/* HERO BANNER */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                padding: '60px 24px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: -60, right: -60,
                    width: 300, height: 300, borderRadius: '50%',
                    backgroundColor: 'rgba(52,131,250,0.1)'
                }} />
                <div style={{
                    position: 'absolute', bottom: -80, left: -40,
                    width: 250, height: 250, borderRadius: '50%',
                    backgroundColor: 'rgba(52,131,250,0.07)'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: '#3483fa',
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: 20,
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        letterSpacing: 1,
                        marginBottom: 16,
                        textTransform: 'uppercase'
                    }}>
                        🌿 Tienda Online 2026
                    </span>

                    <h1 style={{
                        margin: '0 0 16px 0',
                        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                        fontWeight: '900',
                        letterSpacing: '-1px',
                        lineHeight: 1.2
                    }}>
                        Bienvenido a <span style={{ color: '#3483fa' }}>EcoMarket</span>
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        opacity: 0.8,
                        maxWidth: 500,
                        margin: '0 auto 32px'
                    }}>
                        Los mejores productos al mejor precio. Envío gratis en todas tus compras.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                        {[
                            { icon: '🚚', text: 'Envío gratis' },
                            { icon: '🔒', text: 'Compra segura' },
                            { icon: '💳', text: 'Pago fácil' },
                            { icon: '⭐', text: 'Top calidad' },
                        ].map((b, i) => (
                            <span key={i} style={{
                                backgroundColor: 'rgba(52,131,250,0.2)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(52,131,250,0.3)',
                                padding: '8px 18px',
                                borderRadius: 25,
                                fontSize: '0.88rem',
                                fontWeight: '600',
                                color: 'white'
                            }}>
                                {b.icon} {b.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CATEGORÍAS */}
            <div style={{
                backgroundColor: 'white',
                padding: '20px 24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
                <div style={{
                    maxWidth: 1200, margin: '0 auto',
                    display: 'flex', gap: 12,
                    overflowX: 'auto', paddingBottom: 4
                }}>
                    {[
                        { icon: '💻', label: 'Tecnología' },
                        { icon: '👗', label: 'Ropa' },
                        { icon: '🏠', label: 'Hogar' },
                        { icon: '📱', label: 'Celulares' },
                        { icon: '🎮', label: 'Gaming' },
                        { icon: '🌿', label: 'Ecológico' },
                    ].map((cat, i) => (
                        <button key={i} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: 4,
                            padding: '10px 20px',
                            backgroundColor: i === 0 ? '#3483fa' : '#f8f9fa',
                            color: i === 0 ? 'white' : '#333',
                            border: i === 0 ? 'none' : '1px solid #e5e7eb',
                            borderRadius: 10,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                        }}>
                            <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* CATÁLOGO */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <h2 style={{
                        fontSize: '1.5rem', fontWeight: '800',
                        color: '#1a1a2e', margin: 0,
                        borderLeft: '5px solid #3483fa',
                        paddingLeft: 14
                    }}>
                        🔥 Productos Destacados
                    </h2>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>Actualizado hoy</span>
                </div>
                <ProductList />
            </div>
        </div>
    );
}
