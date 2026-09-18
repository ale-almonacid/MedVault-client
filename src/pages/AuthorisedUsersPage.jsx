import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
} from "@/components/ui/alert-dialog"
import { ArrowLeft, MoreHorizontalIcon, Trash2Icon } from "lucide-react"

import { MedicalProfileContext } from "@/context/medicalProfile.context"
import { AuthContext } from "@/context/auth.context"
import service from "@/services/index.services"

function getInitials(username) {
  if (!username) {
    return "?"
  }

  return username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function AuthorisedUsersPage() {

  const navigate = useNavigate()
  const { medicalProfileId } = useParams()

  const { medicalProfiles, isLoading, fetchMedicalProfiles } = useContext(MedicalProfileContext)
  const { loggedUserId } = useContext(AuthContext)

  const [shareEmail, setShareEmail] = useState("")
  const [shareRole, setShareRole] = useState("viewer")
  const [isSharing, setIsSharing] = useState(false)
  const [shareError, setShareError] = useState(null)
  const [pendingUserId, setPendingUserId] = useState(null)
  const [revokeTarget, setRevokeTarget] = useState(null)

  useEffect(() => {
    fetchMedicalProfiles()
  }, [])

  const profile = medicalProfiles.find((p) => p._id === medicalProfileId)

  if (isLoading) {
    return <div className="pt-28 text-center">Loading authorised users...</div>
  }

  if (!profile) {
    return <div className="pt-28 text-center">Medical profile not found.</div>
  }

  const authorisedUsers = [
    ...(profile.editors || []).map((user) => ({ ...user, role: "editor" })),
    ...(profile.viewers || []).map((user) => ({ ...user, role: "viewer" })),
  ]

  const isEditor = (profile.editors || []).some((editor) => editor._id === loggedUserId)

  const handleShare = async (event) => {
    event.preventDefault()
    setIsSharing(true)
    setShareError(null)

    try {
      await service.post(`/medical-profiles/${medicalProfileId}/share`, {
        emailToShareWith: shareEmail,
        role: shareRole,
      })

      await fetchMedicalProfiles()

      setShareEmail("")
      setShareRole("viewer")
    } catch (error) {
      setShareError(
        error.response?.data?.message || "Something went wrong sharing this profile. Please try again."
      )
    } finally {
      setIsSharing(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    setPendingUserId(userId)

    try {
      await service.patch(`/medical-profiles/${medicalProfileId}/share/${userId}`, {
        role: newRole,
      })

      await fetchMedicalProfiles()
    } finally {
      setPendingUserId(null)
    }
  }

  const handleRevoke = async () => {
    if (!revokeTarget) return

    setPendingUserId(revokeTarget._id)

    try {
      await service.delete(`/medical-profiles/${medicalProfileId}/share/${revokeTarget._id}`)

      await fetchMedicalProfiles()
    } finally {
      setPendingUserId(null)
      setRevokeTarget(null)
    }
  }

  return (
    <>
      <Navbar />
      <div id="mainContent" className="relative z-20 mx-auto w-full max-w-360 px-[8vw] pb-8">

        <div className="flex w-fit flex-col gap-4">
          <header className="flex flex-col gap-6 p-8 bg-white">

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/medical-profile/${medicalProfileId}`)}
            className="w-fit"
          >
            <ArrowLeft /> Go back
          </Button>

          <div className='flex flex-col gap-1'>

            <h1 className="heading-h1 text-slate-900">Authorised users</h1>
            <p className="text-muted-foreground">
              Manage who can view or edit {profile.subjectName}'s medical records.
            </p>
          </div>

          </header>
        </div>

        {isEditor && (
          <>
            <form onSubmit={handleShare} className="px-8 py-4">
              <FieldGroup className="flex-row items-end gap-3">
                <Field className="max-w-xs">
                  <Label htmlFor="shareEmail">Email</Label>
                  <Input
                    id="shareEmail"
                    type="email"
                    value={shareEmail}
                    onChange={(event) => setShareEmail(event.target.value)}
                    placeholder="name@example.com"
                    disabled={isSharing}
                    required
                  />
                </Field>

                <Field className="max-w-40">
                  <Label htmlFor="shareRole">Role</Label>
                  <Select value={shareRole} onValueChange={setShareRole} disabled={isSharing}>
                    <SelectTrigger id="shareRole">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Button type="submit" disabled={isSharing || !shareEmail.trim()}>
                  Invite
                </Button>
              </FieldGroup>

              {shareError && <p className="mt-2 text-sm text-destructive">{shareError}</p>}
            </form>

            <Separator className="mx-8 w-auto" />
          </>
        )}

        <div className="px-8 py-4">
          {authorisedUsers.length === 0 ? (
            <p className="text-muted-foreground">No one has access to this profile yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  {isEditor && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {authorisedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-row items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                        </Avatar>
                        {user.username}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    {isEditor && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              disabled={pendingUserId === user._id}
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Role</DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                              value={user.role}
                              onValueChange={(newRole) => handleRoleChange(user._id, newRole)}
                            >
                              <DropdownMenuRadioItem value="editor">Editor</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="viewer">Viewer</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={() => setRevokeTarget(user)}
                            >
                              Revoke access
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

      </div>

      <AlertDialog open={!!revokeTarget} onOpenChange={(open) => !open && setRevokeTarget(null)}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Revoke access?</AlertDialogTitle>
            <AlertDialogDescription>
              {revokeTarget?.username} will no longer be able to view or edit this medical profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleRevoke}>
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AuthorisedUsersPage
