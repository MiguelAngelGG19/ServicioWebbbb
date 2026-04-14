import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// ⚠️ Cambia esta IP si cambias de red (ejecuta ipconfig en tu PC)
const API_URL = 'http://10.251.57.129:4000';

// Instancia de axios con timeout de 5 segundos
const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
            return;
        }

        setCargando(true);
        try {
            const respuesta = await api.post('/api/auth/login', { email, password });
            const token = respuesta.data.token;
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(respuesta.data.usuario));
            navigation.replace('Catalogo');

        } catch (error) {
            // Error de red / timeout / IP incorrecta
            if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
                Alert.alert(
                    '❌ Error de conexión',
                    'No se pudo conectar al servidor.\n\nVerifica que:\n• El servidor esté encendido\n• Estés en la misma red Wi-Fi que tu PC\n• La IP del servidor sea correcta'
                );
            // Error 401: credenciales incorrectas
            } else if (error.response?.status === 401) {
                Alert.alert('❌ Acceso denegado', error.response.data?.error || 'Correo o contraseña incorrectos.');
            // Error 400: campos inválidos
            } else if (error.response?.status === 400) {
                Alert.alert('⚠️ Datos inválidos', error.response.data?.error || 'Revisa los datos ingresados.');
            // Otros errores del servidor
            } else {
                Alert.alert('Error', `Error del servidor: ${error.response?.status || 'desconocido'}`);
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>EcoMarket</Text>
            <Text style={styles.subtitulo}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.boton, cargando && styles.botonDeshabilitado]}
                onPress={handleLogin}
                disabled={cargando}
            >
                {cargando
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.textoBoton}>Entrar</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 25 },
    titulo: { color: '#3b82f6', fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
    subtitulo: { color: '#94a3b8', fontSize: 18, textAlign: 'center', marginBottom: 35 },
    input: { backgroundColor: '#1e293b', color: 'white', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#334155' },
    boton: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    botonDeshabilitado: { backgroundColor: '#1d4ed8', opacity: 0.7 },
    textoBoton: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
