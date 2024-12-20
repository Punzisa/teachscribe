import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import ClassDropdown from '@/components/LessonsPage/ClassDropdown'
import { Colors } from '@/constants/Colors'
import { dataChangeSubject, loadList, removeFromList } from '@/context/storage'
import { SOWData } from '../CreatePage/CreateSchemesOfWork'
import { useRouter } from 'expo-router'
import { ProfileData } from '@/components/ProfilePage/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { generateAndSharePDF } from './ExportSOWPdf'

interface SchemesOfWorkCardProps {
  sow: SOWData
}

const SchemesOfWorkCard: React.FC<SchemesOfWorkCardProps> = ({ sow: sow }) => {
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
      generateAndSharePDF(sow, teacherProfile!)
    }
    if (button === 'Delete') {
      removeFromList('schemes_of_work', sow.id)
    }
    if (button === 'View') {
      router.push({
        pathname: '/(schemes_of_work)/view_schemes_of_work',
        params: { schemeOfWork: JSON.stringify(sow) },
      })
    }
  }

  return (
    <View style={styles.sowContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.sowTitle}>{sow.subject}</Text>
        <TouchableOpacity key={sow.id} onPress={toggleDropdown}>
          <Ionicons
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View>
          <View style={styles.sowButtons}>
            {buttons.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handlePress(item.title)}>
                <Text style={styles.sowButtonText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sowSubTitles}>Term</Text>
          <Text>{sow.term}</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.sowSubTitles}>Year</Text>
          <Text>{sow.year}</Text>
          <View style={{ height: 10 }} />
          <Text style={styles.sowSubTitles}>Weeks Entered</Text>
          <Text>{sow.entries.length}</Text>
        </View>
      )}
    </View>
  )
}

export default function SchemesOfWork() {
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [gradeOptions, setGradeOptions] = useState<{ id: string; label: string }[]>([])
  const [schemesOfWork, setSchemesOfWork] = useState<SOWData[] | null>(null)

  const handleGradeSelect = (value: string) => {
    setSelectedGrade(value)
  }

  const getData = async () => {
    const loadedData = await loadList<SOWData>('schemes_of_work')

    setSchemesOfWork(loadedData!)

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
      if (changedKey === 'schemes_of_work') {
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const filteredSchemesOfWork = schemesOfWork?.filter(
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
        <Text style={styles.sectionTitle}>Schemes Of Work</Text>
        {selectedGrade &&
          filteredSchemesOfWork &&
          filteredSchemesOfWork.map((sow) => <SchemesOfWorkCard key={sow.id} sow={sow} />)}
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
  sowContainer: {
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
  sowTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  sowSubTitles: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  sowButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    borderBottomWidth: 1,
    gap: 8,
    borderBottomColor: '#D5D8DE',
    marginBottom: 10,
  },
  sowButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
})
