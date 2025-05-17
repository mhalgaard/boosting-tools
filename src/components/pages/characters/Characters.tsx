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
import { LoaderPinwheel } from 'lucide-react'
import { capitalize } from 'lodash'

export default function Characters() {
  const { data: characters } = useCharacters()
  const { data: players, isPending } = usePlayers()
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
        return <img key={role} src={tankImg} alt="Tank" className="w-4 h-4" />
      case 'healer':
        return <img key={role} src={healImg} alt="Healer" className="w-4 h-4" />
      case 'dps':
        return <img key={role} src={dpsImg} alt="DPS" className="w-4 h-4" />
      default:
        return '❓'
    }
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 h-full grow justify-center items-center">
        <LoaderPinwheel className="animate-spin" size={50} />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-4">
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
            {player.characterIds?.length === 0 ? (
              <div className="text-slate-400">No characters</div>
            ) : (
              <>
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
                          <TableCell>{capitalize(character.class)}</TableCell>
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
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
