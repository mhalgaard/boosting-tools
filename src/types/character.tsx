export type Character = {
  id: string
  playerId: string
  class: Class
  key: string
  ilvl: number
  role: Role[]
}

export type CreateCharacterRequest = {
  playerId: string
  class: Class
  key: string
  ilvl: number
  role: Role[]
}

export type Role = 'tank' | 'healer' | 'dps'
export type Class =
  | 'warlock'
  | 'hunter'
  | 'mage'
  | 'rogue'
  | 'priest'
  | 'paladin'
  | 'druid'
  | 'shaman'
  | 'death knight'
  | 'monk'
  | 'demon hunter'
  | 'warrior'
  | 'evoker'

export const classValues: Class[] = [
  'warlock',
  'hunter',
  'mage',
  'rogue',
  'priest',
  'paladin',
  'druid',
  'shaman',
  'death knight',
  'monk',
  'demon hunter',
  'warrior',
  'evoker',
]

export type Key =
  | 'ROOK'
  | 'BREW'
  | 'WORK'
  | 'PSF'
  | 'ML'
  | 'DFC'
  | 'FLOOD'
  | 'TOP'
