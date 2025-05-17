import { Card, CardContent, CardDescription, CardTitle } from '../../ui/card'
import { cn } from '@/lib/utils'
import { useCharacters } from '@/hooks/useCharacters'
import { usePlayers } from '@/hooks/usePlayers'
import { useSelectedPlayers } from '@/context/SelectedPlayersContext'
import type { Player } from '@/types/player'
import EditCharacterDialog from './components/EditCharacterDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import healImg from '@/assets/heal.png'
import dpsImg from '@/assets/dps.png'
import tankImg from '@/assets/tank.png'

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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'tank':
        return <img src={tankImg} alt="Tank" className="w-4 h-4" />
      case 'healer':
        return <img src={healImg} alt="Healer" className="w-4 h-4" />
      case 'dps':
        return <img src={dpsImg} alt="DPS" className="w-4 h-4" />
      default:
        return '❓'
    }
  }

  console.log(characters)

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {players?.map((player) => (
        <Card
          key={player.id}
          className={cn('cursor-pointer', {
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
          <CardContent className="text-sm cursor-default">
            <h3 className="font-bold">Characters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Class</TableHead>
                  <TableHead className="text-left">Roles</TableHead>
                  <TableHead className="text-left">iLvl</TableHead>
                  <TableHead className="text-left">Key</TableHead>
                  <TableHead className="text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {characters
                  ?.filter((character) => character.playerId === player.id)
                  .map((character) => (
                    <TableRow
                      key={character.id}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TableCell>{character.class}</TableCell>
                      <TableCell>
                        <div className="flex flex-row gap-1">
                          {character.role.map((x) => getRoleIcon(x))}
                        </div>
                      </TableCell>
                      <TableCell>{character.ilvl}</TableCell>
                      <TableCell>{character.key}</TableCell>
                      <TableCell className="text-right">
                        <EditCharacterDialog characterId={character.id!} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
