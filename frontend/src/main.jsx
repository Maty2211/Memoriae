import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContex.jsx";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap-icons/font/bootstrap-icons.css";

import 'normalize.css';
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode> {/*Check de desarrollo */}
    <BrowserRouter> {/*Habilita los routes */}
      <AuthProvider> {/*Me deja usar el useAuth() que es para proteger las rutas*/}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);