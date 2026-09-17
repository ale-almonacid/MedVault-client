import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import categories from "@/constants/categories"

function MedicalProfileCategoryPage() {

  const navigate = useNavigate()
  const { medicalProfileId, category: categoryId } = useParams()

  const category = categories.find((item) => item.id === categoryId)

  if (!category) {
    return <div className="pt-28 text-center">Category not found.</div>
  }

  return (
    <>
     <Navbar />
    <div id='cover' className='absolute top-0 inset-x-0 z--2 h-[33vh]' style={{ backgroundColor: category.color }}>

    </div>
    <div id="mainContent" className=" relative z-20 mx-auto w-full max-w-360 px-[5vw] pb-8" >

      <div id='headerWrapper' className='flex w-fit flex-col gap-4'>

      <Button  variant="outline" size="sm" onClick={() => navigate(`/medical-profile/${medicalProfileId}`)} className="w-fit ">
      <ArrowLeft/> Go back
      </Button>

      <header className="flex flex-row items-center gap-8 p-8 bg-white">

      <div
        id='iconWrapper'
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ backgroundColor: `${category.color}33` }}
      >
        <span>{category.icon}</span>
      </div>

      <div>
         <h1 className="heading-h1 text-slate-900">{category.name}</h1>
         <p>{category.description}</p>
      </div>

      </header>

      </div>


      <div className='flex flex-row'>

      <div>
        <h2>Documents</h2>
        <p>Upload the documents for this folder </p>
      </div>

      <button>Upload document</button>

      </div>

    </div>
    </>
  )
}

export default MedicalProfileCategoryPage
