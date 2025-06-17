import React from 'react'
import { createContext } from 'react'

const defaultState = {
  refreshAt: '',
  setRefreshAt: (date: string) => {},
}

export const FileManagerContext = createContext(defaultState)

export const useFileManager = () => React.useContext(FileManagerContext)

export function FileManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState(defaultState)

  const value = {
    refreshAt: state.refreshAt,
    setRefreshAt: (date: string) => {
      setState(prev => ({ ...prev, refreshAt: date || new Date().toISOString() }))
    },
  }

  return <FileManagerContext.Provider value={value}>{children}</FileManagerContext.Provider>
}
