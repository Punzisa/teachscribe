import AsyncStorage from '@react-native-async-storage/async-storage'
import { Subject } from 'rxjs'
import { lessons, profile } from './data'

const dataChangeSubject = new Subject<string>()

const saveData = <T>(key: string, value: T): void => {
  const jsonValue = JSON.stringify(value)
  try {
    AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

const saveList = async (key: string, list: any[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(list)
    console.log('ADDED Data:', jsonValue)
    await AsyncStorage.setItem(key, jsonValue)
    dataChangeSubject.next(key)
  } catch (e) {
    console.error('Error saving list', e)
  }
}

const loadData = <T>(key: string): T | null => {
  try {
    const jsonValue = AsyncStorage.getItem(key)
    return jsonValue === null ? (JSON.parse(jsonValue) as T) : null
  } catch (e) {
    console.log(e)
    return null
  }
}

const loadList = async <T>(key: string): Promise<T[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    console.log('LOADED Data:', jsonValue)

    return jsonValue ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.error('Error loading list', e)
    return null
  }
}

const removeData = (key: string): void => {}

const removeFromList = async <T extends { id: string }>(key: string, id: string): Promise<void> => {
  try {
    const list = await loadList<T>(key)
    if (!list) {
      console.warn(`No list found for key: ${key}`)
      return
    }

    const updatedList = list.filter((item) => item.id !== id)
    await saveList(key, updatedList)
    console.log(`Item with id ${id} removed from ${key}`)
    dataChangeSubject.next(key)
  } catch (error) {
    console.error(`Error removing item from list ${key}:`, error)
  }
}

type WithId = { id: string }

const addNewItem = async <T extends WithId>(key: string, newItem: T): Promise<void> => {
  try {
    const existingItems = await loadList<T>(key)
    const newId = Date.now().toString()
    newItem.id = newId

    let updatedItems: T[]

    if (existingItems) {
      updatedItems = [...existingItems, newItem]
    } else {
      updatedItems = [newItem]
    }

    await saveList(key, updatedItems)
    console.log(`New item added to ${key}:`, newItem)
    dataChangeSubject.next(key)
  } catch (error) {
    console.error(`Error adding new item to ${key}:`, error)
  }
}

const initialiseData = async () => {
  const keys = await AsyncStorage.getAllKeys()
  const hasRequiredData = keys.includes('lessons') && keys.includes('profile')

  if (!hasRequiredData) {
    saveList('lessons', lessons)
    saveData('profile', profile)
  }
}

export {
  initialiseData,
  dataChangeSubject,
  saveData,
  loadData,
  loadList,
  removeData,
  removeFromList,
  addNewItem,
}
