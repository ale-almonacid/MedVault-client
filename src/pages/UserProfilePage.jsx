import React from 'react'

import Navbar from "@/components/navigation/Navbar"

function UserProfilePage() {
  return (
      <div id="content" className="mx-auto w-full max-w-360 px-[5vw] pb-8" >
      <Navbar />
      <header className="flex flex-col gap-2 px-8">
        <h1 className="heading-h1 text-slate-900">User profile</h1>
        
      </header>
      </div>
  )
}

export default UserProfilePage