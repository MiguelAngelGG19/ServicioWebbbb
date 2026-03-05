import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
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
            {/* 1. Barra de Navegación */}
            <Navbar />

            {/* 2. Contenido Principal */}
            <main style={{ padding: '20px', flex: 1 }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Catálogo de Productos</h2>
                
                {/* AHORA USAMOS EL COMPONENTE INTELIGENTE EN LUGAR DE LAS TARJETAS ESTÁTICAS */}
                <ProductList />

            </main>

            {/* 3. Pie de página */}
            <Footer />
        </div>
    );
}

export default App
