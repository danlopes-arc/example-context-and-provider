import React, { useContext, useState } from "react"

export interface CountService {
  count: number
  increment: () => void
  decrement: () => void
}

export const CountContext = React.createContext<CountService | undefined>(undefined)

export const CountProvider: React.FC<{ initalCount?: number }> =
  ({ children, initalCount = 0 }) => {
    const [count, setCount] = useState(initalCount)
    const increment = () => setCount((count) => count + 1)
    const decrement = () => setCount((count) => count - 1)

    return <CountContext.Provider value={{
      count,
      increment,
      decrement
    }}>
      {children}
    </CountContext.Provider>
  }

export const useCount = (): CountService => {
  const context = useContext(CountContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}