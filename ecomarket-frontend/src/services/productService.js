import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Función reutilizable para obtener todos los productos
export const obtenerProductos = async () => {
    const respuesta = await axios.get(`${API_URL}/products`);
    return respuesta.data.data || respuesta.data;
};
