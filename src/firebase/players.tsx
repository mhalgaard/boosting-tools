import { db } from '@/firebase'
import type { Player } from '@/types/player'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'

export async function getPlayers(): Promise<Player[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'players'))
    const players = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Player[]
    return players
  } catch (error) {
    console.error('Error fetching players: ', error)
    return []
  }
}

export async function createPlayer(player: Player) {
  try {
    const docRef = await addDoc(collection(db, 'players'), player)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

export async function deletePlayer(playerId: string) {
  try {
    const playerRef = doc(db, 'players', playerId)
    await deleteDoc(playerRef)
    console.log('Document deleted with ID: ', playerId)
  } catch (error) {
    console.error('Error deleting document: ', error)
  }
}

export async function updatePlayer(playerId: string, player: Player) {
  try {
    const playerRef = doc(db, 'players', playerId)
    await updateDoc(playerRef, player)
    console.log('Document updated with ID: ', playerId)
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}
