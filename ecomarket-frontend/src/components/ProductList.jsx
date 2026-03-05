export function ProductList() {
    // 1. Declaración del Estado
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // 2. Efecto Secundario: Conexión a la API al cargar el componente
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                // Hacemos la petición GET a tu Backend en el puerto 4000
                const respuesta = await axios.get('http://localhost:4000/api/products');
                
                // Inspecciona la respuesta en la consola del navegador
                console.log("Datos recibidos de la API:", respuesta.data);

                // Según tu controlador de Node, los datos vienen en respuesta.data.data
                setProductos(respuesta.data.data || respuesta.data);
                
            } catch (err) {
                console.error("Error al obtener productos:", err);
                // Si falla la conexión (ej. Network Error), mostramos un mensaje y cargamos datos de prueba
                setError("No se pudo conectar al backend. Mostrando datos de prueba temporales.");
                setProductos([
                    { id: 1, nombre: 'Laptop Gamer (Prueba)', precio: 15000, stock: 8, imagen_url: null },
                    { id: 2, nombre: 'Iphone 19 (Prueba)', precio: 100000, stock: 0, imagen_url: null },
                    { id: 3, nombre: 'Audífonos Sony (Prueba)', precio: 2500, stock: 15, imagen_url: null }
                ]);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []); // El arreglo vacío indica que solo se ejecuta UNA VEZ

    // Estilos para la grilla
    const styles = {
        grid: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px'
        },
        mensaje: {
            textAlign: 'center',
            color: '#94a3b8',
            marginTop: '50px'
        },
        error: {
            textAlign: 'center',
            color: '#eab308', // Amarillo/Naranja para advertencia
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#332919',
            borderRadius: '5px'
        }
    };

    // 3. Renderizado Condicional de Estados
    if (cargando) {
        return <h2 style={styles.mensaje}>Cargando catálogo desde la base de datos...</h2>;
    }

    return (
        <>
            {/* Si hay error de red, mostramos la advertencia pero igual dibujamos los productos de prueba */}
            {error && <p style={styles.error}>⚠️ {error}</p>}
            
            {(!productos || productos.length === 0) ? (
                <h2 style={styles.mensaje}>No hay productos en la tienda aún.</h2>
            ) : (
                <div style={styles.grid}>
                    {/* Iteramos sobre el arreglo de productos reales (o de prueba) usando map() */}
                    {productos.map((prod) => (
                        <ProductCard key={prod.id} producto={prod} />
                    ))}
                </div>
            )}
        </>
    );
}
