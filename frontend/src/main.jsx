  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.jsx'
  import 'normalize.css/normalize.css';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';
  import './index.css'
  import { AuthProvider } from './AuthContext'; // Importar el Provider
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider> {/* Envolvemos la App */}
          <App />
      </AuthProvider>
    </StrictMode>,
  )