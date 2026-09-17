import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Trash2Icon } from "lucide-react"

import { MedicalProfileContext } from "@/context/medicalProfile.context"
import service from '@/services/index.services'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function DeleteMedicalProfileModal({ medicalProfileId }) {

  const { fetchMedicalProfiles } = useContext(MedicalProfileContext)
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteProfile = async () => {
    setIsDeleting(true)

    try {
      await service.delete(`/medical-profiles/${medicalProfileId}`)

      await fetchMedicalProfiles()
      navigate("/dashboard")
    } catch (error) {
      setIsDeleting(false)
    }
  }

  return (

     <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Delete medical profile">
              <Trash2Icon />
            </Button>

          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete medical profile?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this medical profile and its documents from the database, this action can't be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline" disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDeleteProfile} disabled={isDeleting}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

}

export default DeleteMedicalProfileModal
