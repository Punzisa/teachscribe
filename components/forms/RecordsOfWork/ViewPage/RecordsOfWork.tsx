import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import ClassDropdown from '@/components/LessonsPage/ClassDropdown'
import { Colors } from '@/constants/Colors'
import { dataChangeSubject, loadList, removeFromList } from '@/context/storage'
import { ROWData } from '../CreatePage/CreateRecordsOfWork'
import { useRouter } from 'expo-router'
import { ProfileData } from '@/components/ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from './ExportROWPdf'

interface RecordsOfWorkCardProps {
  row: ROWData
}

const RecordsOfWorkCard: React.FC<RecordsOfWorkCardProps> = ({ row }) => {
  const [teacherProfile, setTeacherProfile] = useState<ProfileData | null>(null)
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profile')
        if (profileData) {
          const parsedData: ProfileData = JSON.parse(profileData)
          setTeacherProfile(parsedData)
        }
      } catch (error) {
        console.error('Error loading profile data:', error)
      }
    }

    loadProfileData()

    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'profile') {
        loadProfileData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])
  const colorScheme = useColorScheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const buttons = [
    // { id: '1', title: 'Edit' },
    { id: '2', title: 'Export' },
    // { id: '3', title: 'Copy' },
    { id: '4', title: 'View' },
    { id: '5', title: 'Delete' },
    // { id: '6', title: 'Submit' },
  ]

  const handlePress = (button: string) => {
    if (button === 'Export') {
      generateAndSharePDF(row, teacherProfile!)
    }
    if (button === 'Delete') {
      removeFromList('schemes_of_work', row.id)
    }
    if (button === 'View') {
      router.push({
        pathname: '/(records_of_work)/view_records_of_work',
        params: { recordOfWork: JSON.stringify(row) },
      })
    }
  }

  return (
    <View style={styles.rowContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.rowTitle}>{row.subject}</Text>
        <TouchableOpacity key={row.id} onPress={toggleDropdown}>
          <Ionicons
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View>
          <View style={styles.rowButtons}>
            {buttons.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handlePress(item.title)}>
                <Text style={styles.rowButtonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.rowSubTitles}>Term</Text>
          <Text>{row.term}</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.rowSubTitles}>Year</Text>
          <Text>{row.year}</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.rowSubTitles}>Weeks Entered</Text>
          <Text>{row.entries.length}</Text>
        </View>
      )}
    </View>
  )
}

export default function RecordsOfWork() {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [gradeOptions, setGradeOptions] = useState<{ id: string; label: string }[]>([])
  const [recordsOfWork, setRecordsOfWork] = useState<ROWData[] | null>(null)

  const handleGradeSelect = (value: string) => {
    setSelectedGrade(value)
  }

  const getData = async () => {
    const loadedData = await loadList<ROWData>('records_of_work')

    setRecordsOfWork(loadedData!)

    // Generate classroom options from loaded data
    const uniqueClasses = Array.from(new Set(loadedData?.map((sow) => sow.grade)))
    const newOptions = uniqueClasses.map((classroom, index) => ({
      id: (index + 1).toString(),
      label: classroom,
    }))
    setGradeOptions(newOptions)
  }

  useEffect(() => {
    getData()
    const subscription = dataChangeSubject.subscribe((changedKey) => {
      if (changedKey === 'records_of_work') {
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const filteredSchemesOfWork = recordsOfWork?.filter(
    (sow) => selectedGrade === '' || sow.grade === selectedGrade
  )

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.sectionTitle}>Class</Text>
        <ClassDropdown
          options={gradeOptions}
          onSelect={handleGradeSelect}
          placeholder="Select Class"
        />
      </View>
      <View style={styles.lessons}>
        <Text style={styles.sectionTitle}>Records Of Work</Text>
        {selectedGrade &&
          filteredSchemesOfWork &&
          filteredSchemesOfWork.map((sow) => <RecordsOfWorkCard key={sow.id} row={sow} />)}
        {!selectedGrade && (
          <View style={styles.selectClass}>
            <Text style={styles.selectClassText}>Class not selected</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  rowContainer: {
    padding: 10,
    backgroundColor: 'white',
  },

  selectClass: {
    backgroundColor: 'white',
    padding: 20,
  },
  selectClassText: {
    fontSize: 16,
    textAlign: 'center',
  },
  lessons: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowSubTitles: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  rowButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 8,
    borderBottomColor: '#D5D8DE',
    marginBottom: 10,
  },
  rowButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
})
