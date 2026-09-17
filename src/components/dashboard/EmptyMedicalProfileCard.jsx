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

import CreateMedicalProfileModal from "@/components/dashboard/CreateMedicalProfileModal"

function EmptyMedicalProfileCard({ className }) {
  return (
     <Empty className={cn("border border-dashed", className)}>
      <EmptyHeader>
        
        <EmptyTitle>You don't have any medical profiles yet.</EmptyTitle>
        <EmptyDescription>
          Start creating one for your or your relatives.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateMedicalProfileModal />
      </EmptyContent>
    </Empty>
  )
}

export default EmptyMedicalProfileCard