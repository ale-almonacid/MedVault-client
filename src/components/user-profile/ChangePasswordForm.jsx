import React, { useState } from 'react'

import service from '@/services/index.services'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ChangePasswordForm() {

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const resetForm = () => {
    setCurrentPassword("")
    setNewPassword("")
    setErrorMessage(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await service.patch("/users/me/change-password", { currentPassword, newPassword })

      setSuccessMessage("Password updated successfully.")
      setCurrentPassword("")
      setNewPassword("")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errorMessage || "Something went wrong updating your password. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4 py-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="current-password">Current password</Label>
        <Input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          disabled={isSaving}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="new-password">New password</Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          disabled={isSaving}
          required
        />
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
      {successMessage && <p className="text-sm text-muted-foreground">{successMessage}</p>}

      <div className="flex flex-row justify-end gap-2">
        <Button type="button" variant="outline" onClick={resetForm} disabled={isSaving}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving || !currentPassword || !newPassword}>
          Update password
        </Button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
