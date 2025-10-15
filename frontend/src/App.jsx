import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MostrarHome } from './components/home'
import { ListarGrupoFlashcards } from './components/flashcard/flashcards'
import { UsarFlashcard } from './components/flashcard/flashcardEspecifica'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {

  return(
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<MostrarHome />}/>
        <Route path="/flashcards" element={<ListarGrupoFlashcards/>}/>
        <Route path="/flashcards/:idGrupoFlashcards/:nombreGrupoFlashcards" element={<UsarFlashcard />}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
