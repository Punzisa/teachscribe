import { LessonData } from '@/components/forms/LessonPlan/LessonPlan'
import { ProfileData } from '@/components/ProfilePage/Profile'

export const profile: ProfileData = {
  salutation: 'Mr.',
  firstName: 'Augustine',
  lastName: 'Ngongo',
  schoolName: 'Munali Boys Secondary School',
  phoneNumber: '0977977779',
}

// we need this so that upcoming lessons can have future lessons in preloaded data
const thirtyDaysFromNow = new Date()
thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

export const lessons: LessonData[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    description:
      'Covers the basics of algebra including variables, constants, and basic operations.',
    duration: '45 minutes',
    subject: 'Mathematics',
    class: '12-4',
    objectives: [
      'Understand variables and constants.',
      'Learn basic algebraic operations.',
      'Solve simple algebraic equations.',
    ],
    activities: {
      teachingAids: 'Whiteboard, Markers, Algebra worksheets',
      teachingActivities: 'Lecture, Example problems on the board',
      pupilActivities: 'Solve worksheet problems, Class discussions',
    },
    date: thirtyDaysFromNow,
    resources: 'Algebra worksheets, Reference books',
    references: 'High School Algebra Textbook, Online Math Resources',
    majorLearningOutcome: 'Ability to solve basic algebraic equations.',
    evidenceOfAttainment: 'Completed worksheets and participation in class discussions.',
    rationale: 'Algebra is foundational for higher-level mathematics.',
    learningDevelopmentEntries: [
      {
        id: 'ld1',
        time: '10 minutes',
        teacherActivites: 'Explain variables and constants.',
        learnerActivities: 'Listen and take notes.',
      },
      {
        id: 'ld2',
        time: '20 minutes',
        teacherActivites: 'Demonstrate example problems on board.',
        learnerActivities: 'Solve similar problems in their notebooks.',
      },
      {
        id: 'ld3',
        time: '15 minutes',
        teacherActivites: 'Distribute and review worksheets.',
        learnerActivities: 'Complete worksheets in pairs.',
      },
    ],
    teacherEvaluation: 'Students demonstrated understanding during class activities.',
    pupilEvaluation: 'I understood the basics of algebra.',
  },
  {
    id: '2',
    title: 'Photosynthesis Process',
    description: 'Explains the process of photosynthesis and its importance to plant life.',
    duration: '60 minutes',
    subject: 'Biology',
    class: '12-4',
    objectives: [
      'Understand the concept of photosynthesis.',
      'Identify the key components involved in photosynthesis.',
      'Explain the importance of sunlight and chlorophyll.',
    ],
    activities: {
      teachingAids: 'Plant samples, Diagrams, Projector',
      teachingActivities: 'Presentation, Group discussion',
      pupilActivities: 'Analyze plant samples, Answer worksheet questions',
    },
    date: new Date(),
    resources: 'Plant samples, Visual aids',
    references: 'Biology Textbook, Online Photosynthesis Videos',
    majorLearningOutcome: 'Comprehension of the photosynthesis process.',
    evidenceOfAttainment: 'Correctly answered worksheet questions.',
    rationale: 'Understanding photosynthesis is critical for biology.',
    learningDevelopmentEntries: [
      {
        id: 'ld1',
        time: '15 minutes',
        teacherActivites: 'Present photosynthesis concept using diagrams.',
        learnerActivities: 'Observe and ask questions.',
      },
      {
        id: 'ld2',
        time: '25 minutes',
        teacherActivites: 'Facilitate group discussion on photosynthesis.',
        learnerActivities: 'Participate and contribute ideas.',
      },
      {
        id: 'ld3',
        time: '20 minutes',
        teacherActivites: 'Guide analysis of plant samples.',
        learnerActivities: 'Analyze and record findings.',
      },
    ],
    teacherEvaluation: 'Students actively participated in discussions.',
    pupilEvaluation: 'I found the process of photosynthesis fascinating.',
  },
  {
    id: '3',
    title: 'World War II Overview',
    description: 'An introduction to the key events, causes, and outcomes of World War II.',
    duration: '50 minutes',
    subject: 'History',
    class: '12-4',
    objectives: [
      'Identify the causes of World War II.',
      'Understand the major events and battles.',
      'Analyze the impact of World War II on global history.',
    ],
    activities: {
      teachingAids: 'Maps, Video clips, Historical artifacts',
      teachingActivities: 'Lecture, Map analysis, Video screening',
      pupilActivities: 'Group discussion, Fill out a timeline worksheet',
    },
    date: thirtyDaysFromNow,
    resources: 'Historical maps, Video archives',
    references: 'World History Textbook, Online WWII Documentaries',
    majorLearningOutcome: 'Understanding the global impact of World War II.',
    evidenceOfAttainment: 'Completed timeline worksheets.',
    rationale: 'World War II is a pivotal event in history.',
    learningDevelopmentEntries: [
      {
        id: 'ld1',
        time: '15 minutes',
        teacherActivites: 'Introduce causes of WWII using maps.',
        learnerActivities: 'Take notes and ask questions.',
      },
      {
        id: 'ld2',
        time: '20 minutes',
        teacherActivites: 'Screen a short documentary on WWII battles.',
        learnerActivities: 'Watch and note significant events.',
      },
      {
        id: 'ld3',
        time: '15 minutes',
        teacherActivites: 'Facilitate group discussion.',
        learnerActivities: 'Share insights and complete timeline worksheet.',
      },
    ],
    teacherEvaluation: 'Students demonstrated curiosity and engagement.',
    pupilEvaluation: 'I learned how WWII shaped modern history.',
  },
  {
    id: '4',
    title: 'Basic Sentence Structure',
    description: 'Covers the structure of simple, compound, and complex sentences.',
    duration: '40 minutes',
    subject: 'English',
    class: '10-3',
    objectives: [
      'Understand the components of a sentence.',
      'Identify different types of sentences.',
      'Write examples of simple, compound, and complex sentences.',
    ],
    activities: {
      teachingAids: 'Sentence worksheets, Whiteboard',
      teachingActivities: 'Sentence breakdown on board, Group sentence creation',
      pupilActivities: 'Work in pairs to write different sentence types',
    },
    date: new Date(),
    resources: 'Grammar worksheets, English textbook',
    references: 'English Grammar Handbook',
    majorLearningOutcome: 'Ability to construct grammatically correct sentences.',
    evidenceOfAttainment: 'Submitted examples of sentence types.',
    rationale: 'Sentence structure is essential for effective communication.',
    learningDevelopmentEntries: [
      {
        id: 'ld1',
        time: '10 minutes',
        teacherActivites: 'Explain components of a sentence.',
        learnerActivities: 'Listen and ask questions.',
      },
      {
        id: 'ld2',
        time: '15 minutes',
        teacherActivites: 'Break down example sentences on board.',
        learnerActivities: 'Identify components in provided examples.',
      },
      {
        id: 'ld3',
        time: '15 minutes',
        teacherActivites: 'Facilitate group sentence creation activity.',
        learnerActivities: 'Collaborate to create sentences.',
      },
    ],
    teacherEvaluation: 'Most students grasped the sentence structures.',
    pupilEvaluation: 'I can now identify and write different sentence types.',
  },
]
