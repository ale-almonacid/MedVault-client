import React, { useContext, useState } from 'react'
import { format } from "date-fns"

// Shadcn Icons
import { CalendarIcon, Pencil } from "lucide-react"

// Context
import { DocumentContext } from "@/context/document.context"
import service from "@/services/index.services"

// Shadcn UI Imports
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const languages = [
  { id: "english", name: "English" },
  { id: "german", name: "German" },
  { id: "spanish", name: "Spanish" },
  { id: "french", name: "French" },
]

function EditDocumentModal({ document: documentToEdit }) {

  const { fetchDocuments } = useContext(DocumentContext)

  const initialTitle = documentToEdit.title || ""
  const initialDate = documentToEdit.date ? new Date(documentToEdit.date) : undefined
  const initialLanguage = documentToEdit.language || ""

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [date, setDate] = useState(initialDate)
  const [language, setLanguage] = useState(initialLanguage)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const resetForm = () => {
    setTitle(initialTitle)
    setDate(initialDate)
    setLanguage(initialLanguage)
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

    const body = { title, date: date.toISOString(), language }

    try {
      await service.patch(`/documents/${documentToEdit._id}`, body)

      await fetchDocuments(documentToEdit.medicalProfile, documentToEdit.category)

      setOpen(false)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong updating the document. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Edit document">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Edit document
              </span>
            </DialogTitle>
            <DialogDescription>
              Update the details of this document.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Blood test results"
                disabled={isSaving}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    type="button"
                    variant="outline"
                    disabled={isSaving}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(day) => day > new Date()}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage} disabled={isSaving}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSaving}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving || !title.trim() || !date}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditDocumentModal
