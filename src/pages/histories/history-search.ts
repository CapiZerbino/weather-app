import { openDB, DBSchema } from 'idb'
import { Location } from '../../interfaces/geocoding'

export interface SearchHistoryDB extends DBSchema {
  searches: {
    key: number
    value: Location
  }
}

const initDB = async () => {
  return openDB<SearchHistoryDB>('search-history-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('searches')) {
        db.createObjectStore('searches', {
          keyPath: 'id',
          autoIncrement: true
        })
      }
    }
  })
}

export const addItem = async (item: Location) => {
  const db = await initDB()
  await db.add('searches', { ...item })
}

export const getItems = async () => {
  const db = await initDB()
  return await db.getAll('searches')
}

export const clearItems = async () => {
  const db = await initDB()
  await db.clear('searches')
}

export const clearItem = async (id: number) => {
  const db = await initDB()
  await db.delete('searches', id)
}
