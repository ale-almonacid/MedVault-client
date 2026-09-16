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

  const { user, setUser } = useContext(AuthContext)

  const [username, setUsername] = useState(user?.username || "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleOpenChange = (nextOpen) => {
    if (nextOpen) {
      setUsername(user?.username || "");
      setErrorMessage(null);
    }
    setOpen(nextOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const response = await service.patch("/users/me", { username });

      setUser((prevUser) => ({ ...prevUser, username: response.data.username }));
      setOpen(false);
    } catch (error) {
      setErrorMessage("Something went wrong updating the username. Please try again.")
    } finally {
      setIsSaving(false);
    }
  };

  return (
     <Dialog open={open} onOpenChange={handleOpenChange}>
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
            <DialogTitle>Edit Username</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         <br></br>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            disabled={isSaving}
            required
          />

          {errorMessage && <p className="mt-2 text-sm text-destructive">{errorMessage}</p>}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving || !username.trim()}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default EditUsernameModal
