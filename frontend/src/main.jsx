import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext'; // Importar el Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Envolvemos la App */}
        <App />
    </AuthProvider>
  </StrictMode>,
)