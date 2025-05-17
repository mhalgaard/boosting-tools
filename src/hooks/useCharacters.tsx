import {
  createCharacter,
  getCharacter,
  getCharacters,
} from '@/firebase/characters'
import type { Character } from '@/types/character'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useCharacters() {
  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: getCharacters,
  })
}

export function useCharacter(characterId: string) {
  return useQuery<Character | null>({
    queryKey: ['characters', characterId],
    queryFn: () => getCharacter(characterId),
  })
}

export function useCreateCharacter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (character: Character) => {
      await createCharacter(character)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['characters'] })
    },
  })
}
