// ============================================================
// CONFIGURACIÓN CENTRAL DE LA APP MÓVIL
// Si cambias de red, solo edita este archivo
// ============================================================

// Obtener la IP de tu PC con: ipconfig (Windows) o ifconfig (Mac/Linux)
export const API_URL = 'http://10.251.57.129:4000';

// Instancia de axios lista para usar en todas las pantallas
import axios from 'axios';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});
