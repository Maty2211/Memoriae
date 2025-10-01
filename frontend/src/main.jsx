import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Mantener la importación de estilos si existe

createRoot(document.getElementById('root')).render(
    <App />
)
