import { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'

type Player = {
  id: number
  name: string
  rioScore: number
  discordId: string
  characters: Character[]
}

type Character = {
  id: number
  name: string
  class: string
  ilvl: number
  faction: string
  server: string
  region: string
  lastUpdated: Date
}

const dummyData: Player[] = [
  {
    id: 1,
    name: 'Player1',
    rioScore: 1500,
    discordId: '123456789',
    characters: [
      {
        id: 1,
        name: 'Character1',
        class: 'Warrior',
        ilvl: 220,
        faction: 'Alliance',
        server: 'Server1',
        region: 'US',
        lastUpdated: new Date(),
      },
      {
        id: 2,
        name: 'Character2',
        class: 'Mage',
        ilvl: 215,
        faction: 'Horde',
        server: 'Server2',
        region: 'EU',
        lastUpdated: new Date(),
      },
    ],
  },
  {
    id: 2,
    name: 'Player2',
    rioScore: 1600,
    discordId: '987654321',
    characters: [
      {
        id: 3,
        name: 'Character3',
        class: 'Druid',
        ilvl: 230,
        faction: 'Alliance',
        server: 'Server3',
        region: 'US',
        lastUpdated: new Date(),
      },
      {
        id: 4,
        name: 'Character4',
        class: 'Paladin',
        ilvl: 225,
        faction: 'Horde',
        server: 'Server4',
        region: 'EU',
        lastUpdated: new Date(),
      },
    ],
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
                  <h2 className="text-xl font-bold">{player.name}</h2>
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
        {dummyData.map((player) => (
          <Card
            key={player.id}
            className="p-3"
            onClick={() => handlePlayerSelection(player)}
          >
            <CardTitle>
              <h2 className="text-xl font-bold">{player.name}</h2>
            </CardTitle>
            <CardDescription>
              <p>Rio Score: {player.rioScore}</p>
              <p>Discord ID: {player.discordId}</p>
            </CardDescription>
            <h3 className="text-lg font-semibold">Characters:</h3>
            <CardContent>
              <ul className="list-disc">
                {player.characters.map((character) => (
                  <li key={character.id}>
                    {character.name} - {character.class} - {character.ilvl} ilvl
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
