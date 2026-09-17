import { createContext, useContext, useState } from "react"

import { AuthContext } from "@/context/auth.context"
import service from "@/services/index.services"

const DocumentContext = createContext()

function DocumentWrapper({ children }) {

  const { isLoggedin } = useContext(AuthContext)

  const [documents, setDocuments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchDocuments = async (medicalProfileId, categoryId) => {
    if (!isLoggedin) {
      return
    }

    setIsLoading(true)

    try {
      const response = await service.get("/documents", {
        params: { medicalProfile: medicalProfileId, category: categoryId },
      })
      setDocuments(response.data)
    } catch (error) {
      setDocuments([])
    } finally {
      setIsLoading(false)
    }
  }

  const passedContext = {
    documents,
    isLoading,
    fetchDocuments,
  }

  return (
    <DocumentContext.Provider value={passedContext}>
      {children}
    </DocumentContext.Provider>
  )
}

export {
  DocumentContext,
  DocumentWrapper,
}
