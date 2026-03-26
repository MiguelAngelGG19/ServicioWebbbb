import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.4:4000';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }
        setCargando(true);
        try {
            const respuesta = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            const token = respuesta.data.token;
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(respuesta.data.usuario));
            navigation.replace('Catalogo');
        } catch (error) {
            Alert.alert('Error', 'Credenciales incorrectas. Intenta de nuevo.');
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
            <TouchableOpacity style={styles.boton} onPress={handleLogin} disabled={cargando}>
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
    textoBoton: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
