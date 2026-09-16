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

function MedicalProfileCard() {
  return (
       <Card className="relative w-full pt-0 md:mx-auto md:max-w-sm">
      
      <img
        src={CoverImage}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardTitle>hello</CardTitle>
        <CardDescription>
          hello
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AvatarGroupCount></AvatarGroupCount>
      </CardFooter>
     
    </Card>
  )
}

export default MedicalProfileCard