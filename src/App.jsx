//React
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from "axios"

//Pages
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "@/pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"
import MedicalProfilePage from "./pages/MedicalProfilePage"
import MedicalProfileCategoryPage from "./pages/MedicalProfileCategoryPage"
import NotFoundPage from "./pages/NotFoundPage"


import React from 'react'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/medical-profile" element={<MedicalProfilePage />} />
      <Route path="/medical-profile/:category" element={<MedicalProfileCategoryPage />} />
      <Route path="/user" element={<UserProfilePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    
  )
}

export default App