//React
import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/auth.context"

//Pages
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "@/pages/HomePage"
import UserProfilePage from "./pages/UserProfilePage"
import MedicalProfilePage from "./pages/MedicalProfilePage"
import MedicalProfileCategoryPage from "./pages/MedicalProfileCategoryPage"
import NotFoundPage from "./pages/NotFoundPage"


import React from 'react'

// Component to protect private routes
function ProtectedRoute({ children }) {
  const { isLoggedin, isLoading } = useContext(AuthContext)

  if (isLoading) return <div>Loading MedVault...</div>
  if (!isLoggedin) return <Navigate to="/login" replace />

  return children
}

// Component to redirect logged-in users away from auth pages
function AnonRoute({ children }) {
  const { isLoggedin, isLoading } = useContext(AuthContext)

  if (isLoading) return <div>Loading MedVault...</div>
  if (isLoggedin) return <Navigate to="/dashboard" replace />

  return children
}


function App() {
  return (
    <Routes>

      {/* Root Path: Redirects to /signup by default */}
      <Route path="/" element={<Navigate to="/signup" replace />} />

      {/* Public / Auth Routes (Redirects to /dashboard if already logged in) */}

      <Route path="/signup" element={<AnonRoute> <SignupPage /> </AnonRoute> } />
      <Route path="/login" element={<AnonRoute> <LoginPage /> </AnonRoute>} />

      {/* Protected Routes (Requires logged in user) */}

      <Route path="/dashboard" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
      <Route path="/medical-profile" element={<ProtectedRoute> <MedicalProfilePage /> </ProtectedRoute>} />
      <Route path="/medical-profile/:category" element={<ProtectedRoute> <MedicalProfileCategoryPage /> </ProtectedRoute>} />
      <Route path="/user" element={<ProtectedRoute> <UserProfilePage /> </ProtectedRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />


    </Routes>
    
  )
}

export default App