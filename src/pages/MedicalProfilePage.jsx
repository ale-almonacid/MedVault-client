import React from 'react'

import { useContext, useEffect } from "react"

import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"

// context
import { MedicalProfileContext } from "@/context/medicalProfile.context"

function MedicalProfilePage() {
  return (
    <div id="content" className="mx-auto w-full max-w-360 px-[5vw] pb-8" >
      <Navbar />
      <header className="flex flex-row gap-40
       px-8">
        <div className="flex flex-col gap-2">
        <h1 className="heading-h1 text-slate-900">Medical Profile</h1>
        
        </div>
       
      </header>

       



    </div>
  )
}

export default MedicalProfilePage