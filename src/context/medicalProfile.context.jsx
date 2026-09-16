import { createContext, useContext, useState } from "react"

import { AuthContext } from "@/context/auth.context"
import service from "@/services/index.services"

const MedicalProfileContext = createContext()

function MedicalProfileWrapper({ children }) {

  const { isLoggedin } = useContext(AuthContext)

  const [medicalProfiles, setMedicalProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMedicalProfiles = async () => {
    if (!isLoggedin) {
      return
    }

    setIsLoading(true)

    try {
      const response = await service.get("/medical-profiles")
      setMedicalProfiles(response.data)
    } catch (error) {
      setMedicalProfiles([])
    } finally {
      setIsLoading(false)
    }
  }

  const passedContext = {
    medicalProfiles,
    isLoading,
    fetchMedicalProfiles,
  }

  return (
    <MedicalProfileContext.Provider value={passedContext}>
      {children}
    </MedicalProfileContext.Provider>
  )
}

export {
  MedicalProfileContext,
  MedicalProfileWrapper,
}
