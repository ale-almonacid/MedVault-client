import React, { useContext, useState } from 'react'

// Shadcn Icons
import { Pencil } from "lucide-react"

// Context
import { MedicalProfileContext } from "@/context/medicalProfile.context"
import service from "@/services/index.services"

// Shadcn UI Imports
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function EditMedicalProfileModal({ medicalProfileId, subjectName: initialSubjectName, description: initialDescription }) {

  const { fetchMedicalProfiles } = useContext(MedicalProfileContext)

  const [open, setOpen] = useState(false)
  const [subjectName, setSubjectName] = useState(initialSubjectName || "")
  const [description, setDescription] = useState(initialDescription || "")
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const resetForm = () => {
    setSubjectName(initialSubjectName || "")
    setDescription(initialDescription || "")
    setErrorMessage(null)
  }

  const handleOpenChange = (nextOpen) => {
    if (nextOpen) {
      resetForm()
    }
    setOpen(nextOpen)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)

    const body = { subjectName, description }

    try {
      await service.patch(`/medical-profiles/${medicalProfileId}`, body)

      await fetchMedicalProfiles()

      setOpen(false)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong updating the profile. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Edit medical profile">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Edit medical profile
              </span>
            </DialogTitle>
            <DialogDescription>
              Update the name and description of this medical profile.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="subjectName">Name</Label>
              <Input
                id="subjectName"
                type="text"
                name="subjectName"
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                placeholder="e.g. Grandma's name"
                disabled={isSaving}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="e.g. Grandma's documents"
                disabled={isSaving}
              />
            </Field>

            {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving || !subjectName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMedicalProfileModal
