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
import { AuthContext } from "@/context/auth.context"
import { useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

function MedicalProfilePage() {

  const navigate = useNavigate()
  const { medicalProfileId } = useParams()

  const { medicalProfiles, isLoading, fetchMedicalProfiles } = useContext(MedicalProfileContext)
  const { loggedUserId } = useContext(AuthContext)

  useEffect(() => {
    fetchMedicalProfiles()
  }, [])

  const profile = medicalProfiles.find((p) => p._id === medicalProfileId)

  const authorizedUsers = profile ? [...(profile.editors || []), ...(profile.viewers || [])] : []
  const isEditor = profile ? (profile.editors || []).some((editor) => editor._id === loggedUserId) : false

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

      <header className="flex flex-row items-center gap-8 p-8 bg-white/40 backdrop-blur-lg border border-white/30 shadow-[0_3px_47px_rgba(28,41,115,0.08)] rounded-[8px]">

      <div className='flex flex-row gap-15'>
         <div className="flex flex-col gap-1">
           <h1 className="heading-h1 text-slate-900">{profile.subjectName}</h1>
         <p>{profile.description || "No description added yet."}</p>
         </div>

         {isEditor && (
           <div className='flex flex-row gap-1'>
             <EditMedicalProfileModal
               medicalProfileId={medicalProfileId}
               subjectName={profile.subjectName}
               description={profile.description}
             />
             <DeleteMedicalProfileModal medicalProfileId={medicalProfileId} />
           </div>
         )}
      </div>

      <Separator orientation="vertical" className="h-16 self-center"></Separator>

      <div id='authorized users' className='flex flex-col gap-2 p-4 bg-[rgba(105,115,135,0.1)] rounded-[8px]'>
        <div className='flex flex-row items-center gap-5 '>
        <h3>Authorised users</h3>
        {isEditor && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/medical-profile/${medicalProfileId}/authorised-users`)}
          >
            edit
          </Button>
        )}
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

      {isEditor && (
        <AddCategoryModal medicalProfileId={medicalProfileId} existingCategories={profile.categories || []} />
      )}

      </div>

      {(profile.categories || []).length === 0 ? (
        isEditor ? (
          <EmptyCategoryCard
            className="mt-4"
            medicalProfileId={medicalProfileId}
            existingCategories={profile.categories || []}
          />
        ) : (
          <p className="mt-4 text-muted-foreground">No categories have been added yet.</p>
        )
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
