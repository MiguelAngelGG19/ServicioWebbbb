import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, API_URL } from '../config';

export default function CatalogScreen({ navigation }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await api.get('/api/products');
                setProductos(respuesta.data.data || respuesta.data);
            } catch (error) {
                console.error('Error al cargar productos:', error.message);
            } finally {
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        navigation.replace('Login');
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                style={styles.imagen}
                source={{ uri: item.imagen_url
                    ? `${API_URL}/${item.imagen_url.replace(/\\/g, '/')}`
                    : 'https://placehold.co/300x200/1e293b/white?text=Producto'
                }}
            />
            <View style={styles.info}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.precio}>${item.precio}</Text>
                <Text style={styles.stock}>Stock: {item.stock}</Text>
                {item.stock > 0 ? (
                    <TouchableOpacity
                        style={styles.botonComprar}
                        onPress={() => navigation.navigate('Checkout', { productoSeleccionado: item })}
                    >
                        <Text style={styles.textoBoton}>Comprar Ahora</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.botonAgotado} disabled>
                        <Text style={styles.textoBoton}>Agotado</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    if (cargando) return <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 100 }} />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitulo}>Catálogo 🛒</Text>
                <View style={styles.headerBotones}>
                    <TouchableOpacity onPress={() => navigation.navigate('MisOrdenes')} style={styles.botonHeader}>
                        <Text style={styles.textoHeader}>Mis Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={[styles.botonHeader, { backgroundColor: '#ef4444' }]}>
                        <Text style={styles.textoHeader}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 15 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: 15, paddingTop: 50 },
    headerTitulo: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    headerBotones: { flexDirection: 'row', gap: 8 },
    botonHeader: { backgroundColor: '#334155', padding: 8, borderRadius: 6 },
    textoHeader: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    card: { backgroundColor: '#1e293b', borderRadius: 10, marginBottom: 20, overflow: 'hidden' },
    imagen: { width: '100%', height: 200 },
    info: { padding: 15 },
    nombre: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    precio: { color: '#10b981', fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    stock: { color: '#94a3b8', fontSize: 14, marginBottom: 15 },
    botonComprar: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8, alignItems: 'center' },
    botonAgotado: { backgroundColor: '#475569', padding: 12, borderRadius: 8, alignItems: 'center' },
    textoBoton: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
