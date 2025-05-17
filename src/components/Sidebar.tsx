import { useSelectedPlayers } from '@/context/SelectedPlayersContext'
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar as ShadcnSidebar,
} from './ui/sidebar'
import { Card } from './ui/card'

export default function Sidebar() {
  const { selectedPlayers } = useSelectedPlayers()
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Selected Players</h1>
      </SidebarHeader>
      <SidebarContent className="flex gap-4 flex-col px-4">
        {selectedPlayers?.map((player) => (
          <Card key={player.id}>
            <h2 className="text-lg font-bold">{player.name}</h2>
            <p>Rio Score: {player.rioScore}</p>
            <p>Discord ID: {player.discordId}</p>
            <h3 className="text-md font-semibold">Characters:</h3>
            {player.characterIds.map((characterId) => (
              <p key={characterId} className="text-sm">
                {characterId}
              </p>
            ))}
          </Card>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </ShadcnSidebar>
  )
}
