import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Trash2Icon } from "lucide-react"
import { AuthContext } from '@/context/auth.context'
import service from '@/services/index.services'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function DeleteUserModal() {

  const { setIsLoggedin, setLoggedUserId, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      await service.delete("/users/me")

      localStorage.removeItem("authToken")
      setIsLoggedin(false)
      setLoggedUserId(null)
      setUser(null)
      navigate("/login")
    } catch (error) {
      setIsDeleting(false)
    }
  }

  return (

     <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" aria-label="Submit">
              <Trash2Icon />
              Delete Account
            </Button>

          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your user from the database, this action can't be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline" disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

}

export default DeleteUserModal
