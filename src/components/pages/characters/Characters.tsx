import { Card, CardContent, CardDescription, CardTitle } from '../../ui/card'
import { cn } from '@/lib/utils'
import { useCharacters } from '@/hooks/useCharacters'
import { usePlayers } from '@/hooks/usePlayers'
import { useSelectedPlayers } from '@/context/SelectedPlayersContext'
import type { Player } from '@/types/player'
import EditCharacter from './components/EditCharacter'

export default function Characters() {
  const { data: characters } = useCharacters()
  const { data: players } = usePlayers()
  const { selectedPlayers, setSelectedPlayers } = useSelectedPlayers()

  const handlePlayerSelection = (player: Player) => {
    if (selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id))
    } else {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  console.log(characters)

  return (
    <div className="flex flex-row gap-4">
      {players?.map((player) => (
        <Card
          key={player.id}
          className={cn('p-3', {
            'bg-green-100': selectedPlayers.some((p) => p.id === player.id),
          })}
          onClick={() => handlePlayerSelection(player)}
        >
          <CardTitle>
            <h2 className="text-lg font-bold">{player.name}</h2>
          </CardTitle>
          <CardDescription>
            <p>Rio Score: {player.rioScore}</p>
            <p>Discord ID: {player.discordId}</p>
          </CardDescription>
          <CardContent className="text-sm">
            <h3 className="text-md font-semibold">Characters:</h3>
            {characters
              ?.filter((character) => character.playerId === player.id)
              .map((character) => (
                <div
                  key={character.id}
                  className="flex gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>{character.class}</div>
                  <div>{character.role}</div>
                  <div>{character.ilvl}</div>
                  <div>{character.key}</div>
                  <EditCharacter characterId={character.id!} />
                </div>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
