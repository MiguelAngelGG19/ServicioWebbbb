import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import CatalogScreen from './screens/CatalogScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: { backgroundColor: '#1e293b' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Catalogo" component={CatalogScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Confirmar Compra' }} />
                <Stack.Screen name="MisOrdenes" component={MyOrdersScreen} options={{ title: 'Mis Compras' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
