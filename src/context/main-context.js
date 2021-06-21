import React, { createContext, useState } from "react"
import { useMemo } from "react"

export const MainContext = createContext()

export const MainProvider = ({ children }) => {
  // Manage subscription states
  const [subscribed, setSubscribed] = useState(false)
  const [subscriptionResponse, setSubscriptionResponse] = useState("")

  const contextValues = useMemo(
    () => ({
      subscribed,
      setSubscribed,
      subscriptionResponse,
      setSubscriptionResponse,
    }),
    [subscribed, subscriptionResponse]
  )

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  )
}

// Set display name for ReactDevTools
MainContext.displayName = "MainContext"
