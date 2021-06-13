import React, { createContext, useState } from "react"

export const MainContext = createContext()

export const MainProvider = ({ children }) => {
  // Manage subscription states
  const [subscribed, setSubscribed] = useState(false)
  const [subscriptionResponse, setSubscriptionResponse] = useState("")

  return (
    <MainContext.Provider
      value={{
        subscribed,
        setSubscribed,
        subscriptionResponse,
        setSubscriptionResponse,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

// Set display name for ReactDevTools
MainContext.displayName = "MainContext"
