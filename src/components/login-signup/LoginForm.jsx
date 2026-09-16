import React from 'react'
import axios from "axios";

import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "@/context/auth.context" // Adjust path to your AuthContext
import service from "@/services/index.services" // Adjust path to your Axios service instance

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




function LoginForm({ className, ...props }) {

    const { setIsLoggedin, setLoggedUserId, setUser } = useContext(AuthContext)
         const navigate = useNavigate()
       
         const [email, setEmail] = useState("")
         const [password, setPassword] = useState("")
         const [errorMessage, setErrorMessage] = useState(null)
       
         const handleEmailChange = (e) => setEmail(e.target.value)
         const handlePasswordChange = (e) => setPassword(e.target.value)
       
         const handleLogin = async (e) => {
           e.preventDefault()
           setErrorMessage(null)
       
           const body = { email, password }
       
           try {
             const response = await service.post("/auth/login", body)
             console.log(response)
       
             // Store the token in LocalStorage
             localStorage.setItem("authToken", response.data.authToken)
       
             // Update auth states
             setIsLoggedin(true)
             setLoggedUserId(response.data.payload._id)
             setUser(response.data.payload)

             navigate("/dashboard")
           } catch (error) {
             console.log(error)
             if (error.response && error.response.status === 400) {
               setErrorMessage(error.response.data.errorMessage)
             } else {
               setErrorMessage("An unexpected error occurred. Please try again.")
             }
           }
         }
   


  return (

    <form onSubmit={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-medium tracking-tight">Login to your account</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-4">
        {/* Email Field */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
          id="email" 
          type="email" 
          placeholder="m@example.com" 
          value={email}
          onChange={handleEmailChange}
          required />
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
           
          </div>
          <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={handlePasswordChange}
          required />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Login
        </Button>

        

        {/* Sign Up Link */}
        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>


        {/* this is the display of the error  */}
        {errorMessage && <p>{errorMessage}</p>} 
      </div>
    </form>
  )
}

export default LoginForm