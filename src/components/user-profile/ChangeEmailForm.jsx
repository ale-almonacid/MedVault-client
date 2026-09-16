import React, { useContext, useState } from 'react'

import { AuthContext } from '@/context/auth.context'
import service from '@/services/index.services'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ChangeEmailForm() {

  const { user, setUser } = useContext(AuthContext)

  const [email, setEmail] = useState(user?.email || "")
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const resetForm = () => {
    setEmail(user?.email || "")
    setErrorMessage(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const response = await service.patch("/users/me/change-email", { email })

      setUser((prevUser) => ({ ...prevUser, email: response.data.email }))
      setSuccessMessage("Email updated successfully.")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.errorMessage || "Something went wrong updating your email. Please try again."
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4 py-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
        <Button type="submit" disabled={isSaving || !email.trim() || email === user?.email}>
          Save
        </Button>
      </div>
    </form>
  )
}

export default ChangeEmailForm
