import React from 'react'
import { Link } from "react-router-dom";

import CoverImage from "@/assets/background1.jpg"

import AvatarGroupCount from './AvatarGroupCountComp';

import { 
    Card,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

function MedicalProfileCard({ name = "Sarah Jenkins (You)", description = "Personal archive" }) {
  return (
    <Card className="w-full rounded-1xsm border-none p-3 md:mx-auto md:max-w-sm">
      <img
        src={CoverImage}
        alt="Profile cover"
        className="aspect-video w-full rounded-sm object-cover"
      />
      <CardHeader className="px-2 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="mx-2 border-t" />
      <CardFooter className="flex-col items-start gap-3 px-2 pt-2">
        <span className="text-xs font-medium tracking-wider text-muted-foreground">
          AUTHORIZED USERS
        </span>
        <AvatarGroupCount />
      </CardFooter>
    </Card>
  )
}

export default MedicalProfileCard