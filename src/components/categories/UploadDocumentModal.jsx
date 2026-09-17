import React, { useContext, useState } from 'react'
import { format } from "date-fns"

// Shadcn Icons
import { CalendarIcon, Plus } from "lucide-react"

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

function UploadDocumentModal({ medicalProfileId, categoryId }) {

  const { fetchDocuments } = useContext(DocumentContext)

  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(undefined)
  const [language, setLanguage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const resetForm = () => {
    setFile(null)
    setTitle("")
    setDate(undefined)
    setLanguage("")
    setErrorMessage(null)
  }

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) {
      resetForm()
    }
    setOpen(nextOpen)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)

    const uploadData = new FormData()
    uploadData.append("file", file)
    uploadData.append("title", title)
    uploadData.append("date", date.toISOString())
    uploadData.append("language", language)
    uploadData.append("medicalProfile", medicalProfileId)
    uploadData.append("category", categoryId)

    try {
      await service.post("/documents", uploadData)

      await fetchDocuments(medicalProfileId, categoryId)

      resetForm()
      setOpen(false)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong uploading the document. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button >
           <Plus /> Upload document
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-[1.3rem] font-semibold tracking-tight text-foreground">
                Upload document
              </span>
            </DialogTitle>
            <DialogDescription>
              Add a new document to this category.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                name="file"
                accept="application/pdf,image/*"
                onChange={(event) => setFile(event.target.files[0] || null)}
                disabled={isSaving}
                required
              />
            </Field>

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
            <Button type="submit" disabled={isSaving || !file || !title.trim() || !date}>
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDocumentModal
