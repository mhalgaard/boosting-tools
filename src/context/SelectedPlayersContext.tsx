import type { Player } from '@/firebase/players'
import React, { createContext, useContext, useState } from 'react'

type SelectedPlayersContextType = {
  selectedPlayers: Player[]
  setSelectedPlayers: (players: Player[]) => void
}

const SelectedPlayersContext = createContext<
  SelectedPlayersContextType | undefined
>(undefined)

export const SelectedPlayersProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])

  return (
    <SelectedPlayersContext.Provider
      value={{ selectedPlayers, setSelectedPlayers }}
    >
      {children}
    </SelectedPlayersContext.Provider>
  )
}

export const useSelectedPlayers = () => {
  const context = useContext(SelectedPlayersContext)
  if (!context) {
    throw new Error(
      'useSelectedPlayers must be used within SelectedPlayersProvider',
    )
  }
  return context
}
