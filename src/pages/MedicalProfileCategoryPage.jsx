import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import categories from "@/constants/categories"
import UploadDocumentModal from "@/components/categories/UploadDocumentModal"
import DocumentCard from "@/components/categories/DocumentCard"
import SearchBar from '@/components/categories/SearchBar'
import { DocumentContext } from "@/context/document.context"
import { MedicalProfileContext } from "@/context/medicalProfile.context"
import { AuthContext } from "@/context/auth.context"

function MedicalProfileCategoryPage() {

  const navigate = useNavigate()
  const { medicalProfileId, category: categoryId } = useParams()
  const { documents, isLoading, fetchDocuments } = useContext(DocumentContext)
  const { medicalProfiles, fetchMedicalProfiles } = useContext(MedicalProfileContext)
  const { loggedUserId } = useContext(AuthContext)
  const [query, setQuery] = useState("")

  const category = categories.find((item) => item.id === categoryId)
  const profile = medicalProfiles.find((p) => p._id === medicalProfileId)
  const isEditor = profile ? (profile.editors || []).some((editor) => editor._id === loggedUserId) : false

  useEffect(() => {
    if (category) {
      fetchDocuments(medicalProfileId, categoryId)
    }
    fetchMedicalProfiles()
  }, [medicalProfileId, categoryId])

  const filteredDocuments = documents.filter((document) =>
    document.title.toLowerCase().includes(query.toLowerCase())
  )

  if (!category) {
    return <div className="pt-28 text-center">Category not found.</div>
  }

  return (
    <>
     <Navbar />
    <div id='cover' className='absolute top-0 inset-x-0 z--2 h-[33vh]' style={{ backgroundColor: `${category.color}50` }}>

    </div>
    <div id="mainContent" className=" relative z-20 mx-auto w-full max-w-360 px-[8vw] pb-8" >

      <div id='headerWrapper' className='flex w-fit flex-col gap-4'>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/medical-profile/${medicalProfileId}`)}
        className="w-fit bg-white/60 backdrop-blur-lg border border-white/30 shadow-[0_3px_47px_rgba(28,41,115,0.08)] rounded-[8px]"
      >
      <ArrowLeft/> Go back
      </Button>

      <header className="flex flex-row items-center gap-8 p-8 bg-white/40 backdrop-blur-lg border border-white/30 shadow-[0_3px_47px_rgba(28,41,115,0.08)] rounded-[8px]">

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


      <div className='flex flex-row items-center justify-between py-6 px-4'>

      <div className='flex flex-col'>
        <h2 className='heading-h2 text-slate-900'>Documents</h2>
        <p>Upload the documents for this folder </p>
      </div>

      {isEditor && (
        <UploadDocumentModal medicalProfileId={medicalProfileId} categoryId={categoryId} />
      )}

      </div>

      <div className="px-4 pb-8">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {isLoading && <p className="px-4 text-muted-foreground">Loading documents...</p>}

      {!isLoading && documents.length === 0 && (
        <p className="px-4 text-muted-foreground">No documents uploaded yet.</p>
      )}

      {!isLoading && documents.length > 0 && filteredDocuments.length === 0 && (
        <p className="px-4 text-muted-foreground">No documents match "{query}".</p>
      )}

      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredDocuments.map((document) => (
          <a
            key={document._id}
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DocumentCard document={document} canEdit={isEditor} />
          </a>
        ))}
      </div>

    </div>
    </>
  )
}

export default MedicalProfileCategoryPage
