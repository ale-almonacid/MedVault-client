import React from 'react'


import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "@/context/auth.context" // Adjust path to your AuthContext
import service from "@/services/index.services"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignupForm({ className, ...props }) {

    

  return (
    
    <form className={cn("flex flex-col gap-6 w-full max-w-sm", className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-medium tracking-tight">Create your account</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Fill in the form below to create your account
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" type="text" placeholder="John Doe" required />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
          <p className="text-xs text-muted-foreground">
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </p>
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters long.
          </p>
        </div>

       

        {/* Submit */}
        <Button type="submit" className="w-full">
          Create Account
        </Button>

       

        <p className="px-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4 hover:text-primary">
            Log in
          </Link>
        </p>
      </div>
    </form>
  )
}
  


export default SignupForm