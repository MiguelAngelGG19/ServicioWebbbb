import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Perfil } from './pages/Perfil';
import { ProtectedRoute } from './components/ProtectedRoute';

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
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Register />} />
                            <Route
                                path="/perfil"
                                element={
                                    <ProtectedRoute>
                                        <Perfil />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}
