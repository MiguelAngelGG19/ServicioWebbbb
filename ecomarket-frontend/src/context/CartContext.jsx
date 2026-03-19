import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (producto) => {
        setCart(prev => {
            const existente = prev.find(item => item.id === producto.id);
            if (existente) {
                // Si ya está, aumenta cantidad
                return prev.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            // Si no está, lo agrega con cantidad 1
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const removeFromCart = (productoId) => {
        setCart(prev => prev.filter(item => item.id !== productoId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
