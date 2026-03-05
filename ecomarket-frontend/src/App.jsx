import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';

export default function App() {
    const appStyle = {
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif'
    };

    return (
        <div style={appStyle}>
            <Navbar />
            <main style={{ padding: '20px', flex: 1 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Catálogo de Productos</h2>
                <ProductList />
            </main>
            <Footer />
        </div>
    );
}