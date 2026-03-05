export function Footer() {
    const styles = {
        footer: {
            backgroundColor: '#1e293b', 
            color: '#94a3b8',
            padding: '20px',
            textAlign: 'center',
            marginTop: 'auto', 
            borderTop: '1px solid #334155'
        }
    };

    return (
        <footer style={styles.footer}>
            <p style={{ margin: 0 }}>© 2026 EcoMarket API. Todos los derechos reservados.</p>
        </footer>
    );
}