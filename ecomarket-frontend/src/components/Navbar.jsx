export function Navbar() {
    const nombreTienda = "EcoMarket Pro";

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1e293b',
            padding: '10px 20px',
            borderBottom: '2px solid #3b82f6'
        },
        logo: {
            color: 'white',
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 'bold'
        },
        menu: {
            listStyle: 'none',
            display: 'flex',
            gap: '15px',
            margin: 0,
            padding: 0
        },
        link: {
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    };

    return (
        <nav style={styles.nav}>
            <h1 style={styles.logo}>{nombreTienda}</h1>
            <ul style={styles.menu}>
                <li style={styles.link}>Inicio</li>
                <li style={styles.link}>Catálogo</li>
                <li style={styles.link}>Iniciar sesión</li>
            </ul>
        </nav>
    );
}