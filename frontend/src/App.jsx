import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calendar1 from "./components/calendar/Calendar1";
import HomePage from "./components/HomePage";
import Perfil from "./components/perfil/Perfil";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calendar1" element={<Calendar1 />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


