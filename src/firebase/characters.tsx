import { db } from '@/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'

export type Character = {
  id?: string
  playerId?: string
  class: string
  key: string
  ilvl: number
  role: string
}

export async function getCharacters(): Promise<Character[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'characters'))
    const characters = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Character[]
    return characters
  } catch (error) {
    console.error('Error fetching characters: ', error)
    return []
  }
}

export async function createCharacter(character: Character) {
  try {
    const docRef = await addDoc(collection(db, 'characters'), character)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}
