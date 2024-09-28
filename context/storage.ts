import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject } from 'rxjs';
import { Lesson } from '@/components/LessonsPage/lessonPlans';

const dataChangeSubject = new Subject<string>();


const saveData = <T>(key: string, value: T): void => {
  const jsonValue = JSON.stringify(value)
  try{
    AsyncStorage.setItem(key, jsonValue)
  }catch(e){
    console.log(e)
  }
}

const saveList = async (key: string, list: any[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(list);
      console.log("ADDED Data:", jsonValue)
      await AsyncStorage.setItem(key, jsonValue);
      dataChangeSubject.next(key);

    } catch (e) {
      console.error('Error saving list', e);
    }
  };
  

const loadData = <T>(key: string): T | null => {
    try {
        const jsonValue = AsyncStorage.getItem(key) 
        return jsonValue === null? JSON.parse(jsonValue) as T : null
    } catch(e) {
        console.log(e)
        return null
    }
}

const loadList = async <T>(key: string): Promise<T[] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log("LOADED Data:", jsonValue)

      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error loading list', e);
      return null;
    }
  };

const removeData = (key: string): void => {
}

const removeFromList = async <T extends { id: string }>(key: string, id: string): Promise<void> => {
    try {
      const list = await loadList<T>(key);
      if (!list) {
        console.warn(`No list found for key: ${key}`);
        return;
      }
  
      const updatedList = list.filter(item => item.id !== id);
      await saveList(key, updatedList);
      console.log(`Item with id ${id} removed from ${key}`);
      dataChangeSubject.next(key);
    } catch (error) {
      console.error(`Error removing item from list ${key}:`, error);
    }
  };
  

const initialiseData =  () => {
    saveList('lessons', lessons)
}


const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Waves as Energy',
    description: 'An introduction to waves and their role in energy transfer.',
    activity: 'Wave simulation experiment',
    classroom: '10-3',
    subject: 'Physics'
  },
  {
    id: '2',
    title: 'Matter and Its Properties',
    description: 'Exploring the fundamental properties of matter.',
    activity: 'States of matter demonstration',
    classroom: '10-3',
    subject: 'Physics'
  },
  {
    id: '3',
    title: 'Physical Quantities and Measurement',
    description: 'Understanding physical quantities and their measurement.',
    activity: 'Precision measurement lab',
    classroom: '11-6',
    subject: 'Physics'
  },
  {
    id: '4',
    title: 'Introduction to Radioactivity',
    description: 'Basic concepts of radioactivity and nuclear physics.',
    activity: 'Geiger counter demonstration',
    classroom: '12-4',
    subject: 'Physics'
  },
  {
    id: '5',
    title: 'Forces and Motion',
    description: 'Newton\'s laws and their applications.',
    activity: 'Force and acceleration experiment',
    classroom: '11-6',
    subject: 'Physics'
  },
  {
    id: '6',
    title: 'Electricity Basics',
    description: 'Introduction to electric circuits and Ohm\'s law.',
    activity: 'Simple circuit building',
    classroom: '10-3',
    subject: 'Physics'
  },
  {
    id: '7',
    title: 'Light and Optics',
    description: 'Properties of light and optical phenomena.',
    activity: 'Refraction and reflection experiments',
    classroom: '12-4',
    subject: 'Physics'
  }
];

export { initialiseData, dataChangeSubject, saveData, loadData, loadList, removeData, removeFromList }
