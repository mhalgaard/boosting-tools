import { db } from '@/firebase'
import type { Character } from '@/types/character'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'

export async function getCharacters(): Promise<Character[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'characters'))
    const characters = querySnapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        id: doc.id,
        ...data,
        role: Array.isArray(data.role) ? data.role : [data.role],
      }
    }) as Character[]
    return characters
  } catch (error) {
    console.error('Error fetching characters: ', error)
    return []
  }
}

export async function getCharacter(id: string): Promise<Character | null> {
  try {
    const docRef = doc(db, 'characters', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Character
    } else {
      console.warn(`Character with ID ${id} not found.`)
      return null
    }
  } catch (error) {
    console.error('Error fetching character by ID:', error)
    return null
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

export async function updateCharacter(character: Character) {
  try {
    const docRef = doc(db, 'characters', character.id!)
    await setDoc(docRef, character)
    console.log('Document updated with ID: ', docRef.id)
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}
