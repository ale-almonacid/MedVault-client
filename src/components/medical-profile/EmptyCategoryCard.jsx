import React from 'react'
import { cn } from "@/lib/utils"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import AddCategoryModal from "@/components/medical-profile/AddCategoryModal"

function EmptyCategoryCard({ className, medicalProfileId, existingCategories = [] }) {
  return (
     <Empty className={cn("border border-dashed", className)}>
      <EmptyHeader>

        <EmptyTitle>You don't have any categories yet.</EmptyTitle>
        <EmptyDescription>
          Start adding the categories of medical documents you need.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddCategoryModal medicalProfileId={medicalProfileId} existingCategories={existingCategories} />
      </EmptyContent>
    </Empty>
  )
}

export default EmptyCategoryCard
