import React from 'react'

import { GalleryVerticalEnd } from "lucide-react"
import LoginForm from "@/components/login-signup/LoginForm"


//images
import Logo from "@/assets/Logo.svg"
//import Background from "@/assets/fractal-glass.webp"
import Background from "@/assets/background1.jpg"

function LoginPage() {
  return (
      <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Column: Logo & Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
           
             <img src={Logo} alt="MedVault logo" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Column: Hero Graphic */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src={Background}
          alt="MedVault Hero"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default LoginPage