import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import {Plus} from "lucide-react"

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
        <Button size="sm">
           <Plus /> Medical Profile
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyMedicalProfileCard