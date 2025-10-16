import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ForgotPasswordPage from "./auth/ForgotPasswordPage";
import ResetPassword from "./auth/ResetPassword";
import Navbar from "./components/Navbar";
import Calendar1 from "./components/calendar/Calendar1";
import HomePage from "./components/HomePage";
import LoginPage from "./auth/LoginPage";
import RegistroPage from "./auth/RegistroPage";
import ToDoList from "./components/toDoList/TaskPage";
import PrivateRoute from "./auth/PrivateRoute";
import TaskFormPage from "./components/toDoList/TaskFormPage";
import ListarGrupoFlashcards from "./components/flashcard/flashcards";
import UsarFlashcard from "./components/flashcard/flashcardEspecifica";
import Perfil from "./components/perfil/Perfil";
import MascotaPerfil from './components/mascota/mascota.jsx';

import "./App.css";

function App() {
  return (
    <Routes>
       Rutas públicas 
      <Route path="/login" element={<LoginPage />} caseSensitive />
      <Route path="/register" element={<RegistroPage />} caseSensitive />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} caseSensitive />
      <Route path="/reset-password/confirm/:uid/:token/" element={<ResetPassword />} caseSensitive />
       Rutas protegidas (el narvar incluido!!)
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <div className="app-container">
              <Navbar />
              <div className="main-content">
                <Outlet />
              </div>
            </div>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/calendar1" element={<Calendar1 />} />
          <Route path="/toDoList" element={<ToDoList />} caseSensitive />
          <Route path="/task-create" element={<TaskFormPage />} caseSensitive />
          <Route path="/task/:id" element={<TaskFormPage />} caseSensitive />
          <Route path="/flashcards" element={<ListarGrupoFlashcards/>} caseSensitive />
          <Route path="/mascota" element={<MascotaPerfil />} caseSensitive />
          <Route path="/flashcards/:idGrupoFlashcards/:nombreGrupoFlashcards" element={<UsarFlashcard />} caseSensitive />
          <Route path="/perfil" element={<Perfil />} caseSensitive />
        </Route>
      </Route>

       Cualquier otra ruta: a /login
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;