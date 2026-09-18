import React from 'react'
import { format } from "date-fns"

import CoverImage from "@/assets/background1.jpg"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import EditDocumentModal from "@/components/categories/EditDocumentModal"
import DeleteDocumentModal from "@/components/categories/DeleteDocumentModal"

const languageFlags = {
  english: "fi-us",
  german: "fi-de",
  spanish: "fi-es",
  french: "fi-fr",
}

function DocumentCard({ document, canEdit }) {

  const { title, date, language, fileUrl } = document
  const flagClass = languageFlags[language]

  return (
    <Card className="relative mx-auto w-full max-w-56 gap-3 pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={fileUrl || CoverImage}
        alt={title}
        onError={(event) => {
          event.currentTarget.src = CoverImage
        }}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />

      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          {flagClass ? (
            <span className={`fi ${flagClass} rounded-xs`} title={language} />
          ) : (
            <span />
          )}

          {canEdit && (
            <div
              className="flex flex-row gap-1.5"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            >
              <EditDocumentModal document={document} />
              <DeleteDocumentModal document={document} />
            </div>
          )}
        </div>

        <CardTitle>{title}</CardTitle>
        <CardDescription>{format(new Date(date), "PPP")}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default DocumentCard
