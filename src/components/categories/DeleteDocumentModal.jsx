import React, { useContext, useState } from 'react'

import { Trash2Icon } from "lucide-react"

import { DocumentContext } from "@/context/document.context"
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

function DeleteDocumentModal({ document: documentToDelete }) {

  const { fetchDocuments } = useContext(DocumentContext)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteDocument = async () => {
    setIsDeleting(true)

    try {
      await service.delete(`/documents/${documentToDelete._id}`)

      await fetchDocuments(documentToDelete.medicalProfile, documentToDelete.category)
    } catch (error) {
      setIsDeleting(false)
    }
  }

  return (

     <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Delete document">
              <Trash2Icon />
            </Button>

          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete document?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this document from the database, this action can't be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline" disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDeleteDocument} disabled={isDeleting}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

}

export default DeleteDocumentModal
