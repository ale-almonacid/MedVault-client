import React from 'react'
import { Link } from "react-router-dom";

import CoverImage from "@/assets/background1.jpg"

import AvatarGroupCount from './AvatarGroupCountComp';
import { Separator } from '../ui/separator';

import {
    Card,
    CardDescription,
    CardHeader,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

function MedicalProfileCard({ profile }) {

  const authorizedUsers = [...(profile.editors || []), ...(profile.viewers || [])]

  return (
    <Link to={`/medical-profile/${profile._id}`}>
      <Card className=" w-full rounded-1xsm border-none p-2 md:mx-auto md:max-w-sm">
      

        <div className="">

          <div className='h-36 bg-cover bg-center bg-no-repeat rounded-md' style={{ backgroundImage: `url(${CoverImage})`}}>
          </div>

          <div className='py-4 px-2'>
          <CardTitle className="text-xl">{profile.subjectName}</CardTitle>
          <CardDescription>{profile.description || "No description added yet."}</CardDescription>

          </div>
        <Separator></Separator>
        </div>
        

        <div className="flex flex-col items-start gap-2 px-2 pb-2">
          <span className="text-xs font-medium tracking-wider text-muted-foreground">
            AUTHORIZED USERS
          </span>
          <AvatarGroupCount users={authorizedUsers} />
        </div>
      </Card>
    </Link>
  )
}

export default MedicalProfileCard
