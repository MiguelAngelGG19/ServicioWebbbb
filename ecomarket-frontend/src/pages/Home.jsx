import React from 'react';
import { ProductList } from '../components/ProductList';

export function Home() {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
                Catálogo de Productos
            </h2>
            <ProductList />
        </div>
    );
}
