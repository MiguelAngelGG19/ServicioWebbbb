import React from 'react';
import { ProductList } from '../components/ProductList';

// ✅ export default
export default function Home() {
    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', padding: '30px 0 10px', color: '#333' }}>
                Catálogo de Productos
            </h2>
            <ProductList />
        </div>
    );
}
