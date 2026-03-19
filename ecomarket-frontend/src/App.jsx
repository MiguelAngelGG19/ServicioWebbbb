import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import MisCompras from './pages/MisCompras';
import AdminDashboard from './pages/AdminDashboard';
import Perfil from './pages/Perfil';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* RUTAS PROTEGIDAS (solo usuarios logueados) */}
              <Route path="/carrito" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              
              <Route path="/mis-compras" element={
                <ProtectedRoute>
                  <MisCompras />
                </ProtectedRoute>
              } />
              
              <Route path="/perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
              
              {/* RUTA DE ADMIN (solo administradores) */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
