export type Player = {
  id?: string
  name: string
  rioScore: number
  discordId: string
  characterIds: string[]
}

export type CreatePlayerRequest = {
  name: string
  rioScore: number
  discordId: string
  characterIds: string[]
}
