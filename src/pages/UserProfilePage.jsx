import React, { useContext } from 'react'
import { AuthContext } from '@/context/auth.context'

import Navbar from "@/components/navigation/Navbar"
import EditAvatarModal from '@/components/user-profile/EditAvatarModal'
import EditUsernameModal from '@/components/user-profile/EditUsernameModal'
import DeleteUserModal from '@/components/user-profile/DeleteUserModal'
import ChangePasswordForm from '@/components/user-profile/ChangePasswordForm'
import ChangeEmailForm from '@/components/user-profile/ChangeEmailForm'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { Separator } from "@/components/ui/separator"


function UserProfilePage() {

    const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <div className="pt-28 text-center">Loading profile...</div>
  }

  return (
      <div id="content" className="mx-auto w-full max-w-360 px-[5vw] pb-8" >
      <Navbar />
      <header className="flex flex-row gap-8 items-center px-8 bg-white/70 p-5 rounded-lg shadow-[0_3px_53px_rgba(28,41,115,0.08)]">
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

        <div className="flex flex-row items-center gap-2">
          <h1 className="heading-h1 text-slate-900">{user?.username}</h1>
          <EditUsernameModal />
        </div>
        <p>{user?.email} </p>
        </div>

        
      </header>

      <div className='flex flex-col gap-1 px-5 py-6'>
        <h2 className='heading-h2 text-slate-900'>Account Settings</h2>

        <Separator></Separator>

         <Tabs className="py-3" defaultValue="password">
      <TabsList variant="line">
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
      </TabsList>
      <TabsContent value="password">
        <ChangePasswordForm />
      </TabsContent>
      <TabsContent value="email">
        <ChangeEmailForm />
      </TabsContent>
    </Tabs>
      </div>


      <div className='flex flex-col gap-1 px-5 py-6'>
        <h2 className='heading-h2 text-slate-900'>Danger zone</h2>

        <Separator></Separator>

        <div className='flex flex-row gap-30 py-3'>


        <div className='flex flex-col gap-1'>
        <p className='text-muted-foreground'> <span className='text-destructive font-medium'>Delete account</span>  - When you delete your account, any medical profiles you created, along with all documents and other content associated with those profiles, will be permanently deleted.</p>

        <p className='text-muted-foreground'> <span className='text-muted-foreground font-medium'>Exception:</span>  Medical Profiles with another editor will not be deleted, this editor will continue to have access.</p>
        </div>   

        <DeleteUserModal />

        </div>


        
      </div>




      </div>
  )
}

export default UserProfilePage