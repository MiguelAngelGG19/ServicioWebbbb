import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

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
        <AuthProvider>
            <BrowserRouter>
                <div style={appStyle}>
                    <Navbar />

                    <main style={{ padding: '20px', flex: 1 }}>
                        <Routes>
                            {/* Ruta Principal: El catálogo */}
                            <Route path="/" element={
                                <>
                                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Catálogo de Productos</h2>
                                    <ProductList />
                                </>
                            } />
                            
                            {/* Ruta del Login */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Register />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}