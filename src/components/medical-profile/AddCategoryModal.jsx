import React, { useContext, useState } from 'react'

// Shadcn UI Imports
import { Plus } from "lucide-react"
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

import categories from "@/constants/categories"
import CategoryCard from "@/components/medical-profile/CategoryCard"
import { MedicalProfileContext } from "@/context/medicalProfile.context"
import service from "@/services/index.services"

function AddCategoryModal({ medicalProfileId, existingCategories = [] }) {

  const { fetchMedicalProfiles } = useContext(MedicalProfileContext)

  const [open, setOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(existingCategories)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleOpenChange = (nextOpen) => {
    if (nextOpen) {
      setSelectedCategories(existingCategories)
      setErrorMessage(null)
    }
    setOpen(nextOpen)
  }

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)

    try {
      await service.patch(`/medical-profiles/${medicalProfileId}/categories`, {
        categories: selectedCategories,
      })

      await fetchMedicalProfiles()

      setOpen(false)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong saving categories. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">
           <Plus /> Add category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Add a new category folder
              </span>
            </DialogTitle>
            <DialogDescription>
              add categories that will behave as folder for your documents by speciality
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                categoryId={category.id}
                selected={selectedCategories.includes(category.id)}
                onClick={() => toggleCategory(category.id)}
              />
            ))}
          </div>

          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              Update selection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryModal
