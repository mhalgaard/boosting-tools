import { getPlayers, updatePlayer, type Player } from '@/firebase/players'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  })
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (player: Player) => {
      if (!player.id) return
      await updatePlayer(player.id, player)
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['players'] })
    },
  })
}
