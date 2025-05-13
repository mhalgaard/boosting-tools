import { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

type Player = {
  id: number
  name: string
  rioScore: number
  discordId: string
  characters: Character[]
}

type Character = {
  id: number
  class: string
  key: string
  ilvl: number
  role: string
  lastUpdated: Date
}

const players: Player[] = [
  {
    id: 1,
    name: 'Thomas',
    rioScore: 3100,
    discordId: '98375951871639552',
    characters: [
      {
        id: 1,
        class: 'DK',
        key: 'ROOK',
        ilvl: 671,
        role: 'tank',
        lastUpdated: new Date(),
      },
      {
        id: 2,
        class: 'Warlock',
        key: 'BREW',
        ilvl: 668,
        role: 'dps',
        lastUpdated: new Date(),
      },
      {
        id: 3,
        class: 'Paladin',
        key: 'WORK',
        ilvl: 666,
        role: 'heal',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    id: 2,
    name: 'Semedo',
    rioScore: 3200,
    discordId: '854373316096688128',
    characters: [
      {
        id: 4,
        class: 'Shaman',
        key: 'PSF',
        ilvl: 669,
        role: 'heal',
        lastUpdated: new Date(),
      },
      {
        id: 5,
        class: 'Paladin',
        key: 'PSF',
        ilvl: 670,
        role: 'heal',
        lastUpdated: new Date(),
      },
      {
        id: 6,
        class: 'Druid',
        key: 'ML',
        ilvl: 670,
        role: 'heal',
        lastUpdated: new Date(),
      },
      {
        id: 7,
        class: 'Evoker',
        key: 'BREW',
        ilvl: 668,
        role: 'dps',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    id: 3,
    name: 'Mikkel',
    rioScore: 3200,
    discordId: '98375787501080576',
    characters: [
      {
        id: 8,
        class: 'Rogue',
        key: 'ROOK',
        ilvl: 672,
        role: 'dps',
        lastUpdated: new Date(),
      },
      {
        id: 9,
        class: 'DH',
        key: 'ROOK',
        ilvl: 671,
        role: 'tank',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    id: 4,
    name: 'Prang',
    rioScore: 3200,
    discordId: '121671738349191171',
    characters: [
      {
        id: 10,
        class: 'Mage',
        key: 'PSF',
        ilvl: 671,
        role: 'dps',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    id: 5,
    name: 'Seba',
    rioScore: 3200,
    discordId: '169452589111443458',
    characters: [],
  },
]

export default function Characters() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])

  const handlePlayerSelection = (player: Player) => {
    if (selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id))
    } else {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Selected Players</h1>
        <div className="flex flex-row gap-2">
          {selectedPlayers.length === 0 ? (
            <p>No players selected</p>
          ) : (
            selectedPlayers.map((player) => (
              <Card key={player.id} className="p-3 mb-2">
                <CardTitle>
                  <h2 className="text-lg font-bold">{player.name}</h2>
                </CardTitle>
                <CardDescription>
                  <p>Rio Score: {player.rioScore}</p>
                  <p>Discord ID: {player.discordId}</p>
                </CardDescription>
              </Card>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {players.map((player) => (
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
              {player.characters.map((character) => (
                <p key={character.id}>
                  {character.class} - {character.ilvl}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
