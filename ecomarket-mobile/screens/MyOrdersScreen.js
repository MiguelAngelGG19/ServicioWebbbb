import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.1.4:4000';

export default function MyOrdersScreen() {
    const [ordenes, setOrdenes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [refrescando, setRefrescando] = useState(false);

    const obtenerOrdenes = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { Alert.alert('Error', 'No hay sesión activa'); return; }
            const respuesta = await axios.get(`${API_URL}/api/orders/mis-compras`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrdenes(respuesta.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar tus compras.');
        } finally {
            setCargando(false);
            setRefrescando(false);
        }
    }, []);

    useEffect(() => { obtenerOrdenes(); }, [obtenerOrdenes]);

    const onRefresh = () => {
        setRefrescando(true);
        obtenerOrdenes();
    };

    const renderOrden = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.ordenId}>Orden #{item.id}</Text>
                <Text style={[
                    styles.estado,
                    item.estado === 'completado' && { color: '#10b981' },
                    item.estado === 'pendiente' && { color: '#f59e0b' },
                    item.estado === 'cancelado' && { color: '#ef4444' }
                ]}>{item.estado}</Text>
            </View>
            <Text style={styles.total}>Total: ${item.total}</Text>
            <View style={styles.separador} />
            <Text style={styles.productosLabel}>Productos:</Text>
            {item.Products && item.Products.map((prod, index) => (
                <Text key={index} style={styles.producto}>
                    • {prod.nombre} x{prod.OrderItem?.cantidad} — ${prod.OrderItem?.precio_unitario}
                </Text>
            ))}
        </View>
    );

    if (cargando) return <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 100 }} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={ordenes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrden}
                contentContainerStyle={{ padding: 15 }}
                refreshing={refrescando}
                onRefresh={onRefresh}
                ListEmptyComponent={
                    <Text style={styles.vacio}>No tienes compras aún. ¡Ve al catálogo!</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    card: { backgroundColor: '#1e293b', borderRadius: 10, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    ordenId: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    estado: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
    total: { color: '#10b981', fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    separador: { height: 1, backgroundColor: '#334155', marginBottom: 10 },
    productosLabel: { color: '#94a3b8', fontSize: 13, marginBottom: 6 },
    producto: { color: 'white', fontSize: 14, marginBottom: 4 },
    vacio: { color: '#94a3b8', textAlign: 'center', marginTop: 60, fontSize: 16 }
});
