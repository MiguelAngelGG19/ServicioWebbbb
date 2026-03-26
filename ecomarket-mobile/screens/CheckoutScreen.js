import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.4:4000';

export default function CheckoutScreen({ route, navigation }) {
    const { productoSeleccionado } = route.params;
    const [procesando, setProcesando] = useState(false);

    const realizarCompra = async () => {
        setProcesando(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert('Sesión expirada', 'Debes iniciar sesión de nuevo.');
                navigation.replace('Login');
                return;
            }
            const respuesta = await axios.post(
                `${API_URL}/api/orders`,
                { items: [{ productoId: productoSeleccionado.id, cantidad: 1 }] },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (respuesta.data.success) {
                Alert.alert('¡Éxito! 🎉', `Orden #${respuesta.data.orderId} creada.`, [
                    { text: 'Ver mis compras', onPress: () => navigation.navigate('MisOrdenes') },
                    { text: 'Volver al catálogo', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            Alert.alert('Error', error.response?.data?.error || 'No se pudo procesar la compra.');
        } finally {
            setProcesando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Resumen de Orden</Text>
            <View style={styles.tarjeta}>
                <Text style={styles.label}>Producto:</Text>
                <Text style={styles.valor}>{productoSeleccionado.nombre}</Text>
                <View style={styles.separador} />
                <Text style={styles.label}>Cantidad:</Text>
                <Text style={styles.valor}>1 unidad</Text>
                <View style={styles.separador} />
                <Text style={styles.label}>Total a pagar:</Text>
                <Text style={styles.totalPrecio}>${productoSeleccionado.precio}</Text>
            </View>
            <TouchableOpacity
                style={[styles.boton, procesando && styles.botonDeshabilitado]}
                onPress={realizarCompra}
                disabled={procesando}
            >
                {procesando
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.textoBoton}>Confirmar Pago</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonCancelar} onPress={() => navigation.goBack()}>
                <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a', padding: 25 },
    titulo: { color: '#3b82f6', fontSize: 26, fontWeight: 'bold', marginBottom: 25, marginTop: 20 },
    tarjeta: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, marginBottom: 30, borderWidth: 1, borderColor: '#334155' },
    label: { color: '#94a3b8', fontSize: 14, marginBottom: 4 },
    valor: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    totalPrecio: { color: '#10b981', fontSize: 28, fontWeight: 'bold' },
    separador: { height: 1, backgroundColor: '#334155', marginBottom: 15 },
    boton: { backgroundColor: '#10b981', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
    botonDeshabilitado: { backgroundColor: '#475569' },
    textoBoton: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    botonCancelar: { alignItems: 'center', padding: 12 },
    textoCancelar: { color: '#94a3b8', fontSize: 16 }
});
