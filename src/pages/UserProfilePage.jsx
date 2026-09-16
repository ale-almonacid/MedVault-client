import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth.context'

import Navbar from "@/components/navigation/Navbar"
import EditAvatarModal from '@/components/user-profile/EditAvatarModal'

function UserProfilePage() {

    const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <div className="pt-28 text-center">Loading profile...</div>
  }

  return (
      <div id="content" className="mx-auto w-full max-w-360 px-[5vw] pb-8" >
      <Navbar />
      <header className="flex flex-row gap-8 items-center bg-white/70 p-5 rounded-lg shadow-[0_3px_53px_rgba(28,41,115,0.08)]">
        <div className="relative h-24 w-24 min-w-24">
          <div id="Avatar" className="h-24 w-24 min-w-24 rounded-full bg-cover bg-center border border-slate-200/60"
            style={{
            backgroundImage: `url(${user?.avatar || '/avatar-placeholder.jpg'})`
            }}>

          </div>
          <div className="absolute -bottom-1 -right-1">
            <EditAvatarModal />
          </div>
        </div>

        <div className='flex flex-col gap-1'>

        <h1 className="heading-h1 text-slate-900">{user?.username}</h1>
        <p>{user?.email} </p>
        </div>

        
      </header>
      </div>
  )
}

export default UserProfilePage