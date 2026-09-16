import React from 'react'
import React, { useContext, useState } from 'react'
import { PencilLine } from "lucide-react"

import { AuthContext } from '@/context/auth.context'
import service from '@/services/index.services'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input';

function EditUsernameModal() {



    
  return (
     <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative flex h-7.5 w-7.5 flex-row items-center gap-1.5 rounded-lg bg-white/31 p-1.5 shadow-[-7px_6px_12px_rgba(12,12,94,0.15)] backdrop-blur-[2px]"
        >
          <PencilLine className="size-full" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Avatar</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div
            className="mx-auto my-4 h-24 w-24 rounded-full bg-cover bg-center border border-slate-200/60"
            style={{
              backgroundImage: `url(${imageUrl || user?.avatar || '/avatar-placeholder.jpg'})`,
            }}
          />

          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

          {isUploading && <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>}
          {errorMessage && <p className="mt-2 text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading || !imageUrl}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default EditUsernameModal