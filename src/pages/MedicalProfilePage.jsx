import React from 'react'

import { useContext, useEffect } from "react"

import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import AvatarGroupCount from '@/components/dashboard/AvatarGroupCountComp';
import CategoryCard from '@/components/medical-profile/CategoryCard';
import AddCategoryModal from '@/components/medical-profile/AddCategoryModal';
import EmptyCategoryCard from '@/components/medical-profile/EmptyCategoryCard';
import EditMedicalProfileModal from '@/components/medical-profile/EditMedicalProfileModal';
import DeleteMedicalProfileModal from '@/components/medical-profile/DeleteMedicalProfileModal';

//images
import CoverImage from "@/assets/background1.jpg"

// context
import { MedicalProfileContext } from "@/context/medicalProfile.context"
import { useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

function MedicalProfilePage() {

  const navigate = useNavigate()
  const { medicalProfileId } = useParams()

  const { medicalProfiles, isLoading, fetchMedicalProfiles } = useContext(MedicalProfileContext)

  useEffect(() => {
    fetchMedicalProfiles()
  }, [])

  const profile = medicalProfiles.find((p) => p._id === medicalProfileId)

  const authorizedUsers = profile ? [...(profile.editors || []), ...(profile.viewers || [])] : []

  if (isLoading) {
    return <div className="pt-28 text-center">Loading medical profile...</div>
  }

  if (!profile) {
    return <div className="pt-28 text-center">Medical profile not found.</div>
  }

  return (
    <>
     <Navbar />
    <div id='cover' className='absolute top-0 inset-x-0 z--2  h-[33vh] bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${CoverImage})`}}>

    </div>
    <div id="mainContent" className=" relative z-20 mx-auto w-full max-w-360 px-[5vw] pb-8" >

      <div id='headerWrapper' className='flex w-fit flex-col gap-4'>

      <Button  variant="outline" size="sm" onClick={() => navigate("/dashboard")} className="w-fit ">
      <ArrowLeft/> Go back
      </Button>

      <header className="flex flex-row items-center gap-8 p-8 bg-white">

      <div className='flex flex-row gap-15'>
         <div className="flex flex-col gap-1">
           <h1 className="heading-h1 text-slate-900">{profile.subjectName}</h1>
         <p>{profile.description || "No description added yet."}</p>
         </div>

         <div className='flex flex-row gap-1'>
           <EditMedicalProfileModal
             medicalProfileId={medicalProfileId}
             subjectName={profile.subjectName}
             description={profile.description}
           />
           <DeleteMedicalProfileModal medicalProfileId={medicalProfileId} />
         </div>
      </div>

      <Separator orientation="vertical" className="h-16 self-center"></Separator>

      <div id='authorized users' className='p-4 bg-white'>
        <div className='flex flex-row items-center gap-5 p-2'>
        <h3>Authorised users</h3>
        <Button>edit</Button>
        </div>
        <Separator></Separator>
         <AvatarGroupCount users={authorizedUsers} />
      </div>

      </header>

      </div>


      <div className='flex flex-row items-center justify-between py-6 px-4'>

      <div className='flex flex-col'>
        <h2 className='heading-h2 text-slate-900'>Categories</h2>
        <p>Choose the categories of medical documents that you need </p>
      </div>

      <AddCategoryModal medicalProfileId={medicalProfileId} existingCategories={profile.categories || []} />

      </div>

      {(profile.categories || []).length === 0 ? (
        <EmptyCategoryCard
          className="mt-4"
          medicalProfileId={medicalProfileId}
          existingCategories={profile.categories || []}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
          {(profile.categories || []).map((categoryId) => (
            <CategoryCard
              key={categoryId}
              categoryId={categoryId}
              to={`/medical-profile/${medicalProfileId}/${categoryId}`}
            />
          ))}
        </div>
      )}









    </div>
    </>
  )
}

export default MedicalProfilePage
