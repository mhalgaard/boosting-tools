import { getCharacter, updateCharacter } from '@/firebase/characters'
import type { Character } from '@/types/character'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useCharacter(characterId: string) {
  return useQuery<Character | null>({
    queryKey: ['characters', characterId],
    queryFn: () => getCharacter(characterId),
  })
}

export function useUpdateCharacter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (character: Character) => {
      await updateCharacter(character)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['characters'] })
    },
  })
}
