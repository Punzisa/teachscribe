import { LessonData } from '@/components/forms/LessonPlan/LessonPlan'
import { ProfileData } from '@/components/ProfilePage/Profile'

export const profile: ProfileData = {
  salutation: 'Mr.',
  firstName: 'Augustine',
  lastName: 'Ngongo',
  schoolName: 'Munali Boys Secondary School',
  phoneNumber: '0977977779',
}

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
  },
  {
    id: '5',
    title: 'Introduction to Fractions',
    description: 'Introduction to fractions, including how to add, subtract, and simplify them.',
    duration: '45 minutes',
    subject: 'Mathematics',
    class: '10-3',
    objectives: [
      'Understand the concept of fractions.',
      'Learn how to add and subtract fractions.',
      'Simplify fractions.',
    ],
    activities: {
      teachingAids: 'Fraction tiles, Whiteboard',
      teachingActivities: 'Hands-on fraction practice, Example problems',
      pupilActivities: 'Solve fraction problems in pairs',
    },
  },
  {
    id: '6',
    title: 'Exploring the Solar System',
    description:
      'An exploration of the planets, moons, and other celestial bodies in our solar system.',
    duration: '60 minutes',
    subject: 'Science',
    class: '10-3',
    objectives: [
      'Identify the planets in the solar system.',
      'Understand the differences between planets and other celestial bodies.',
      'Learn key facts about each planet.',
    ],
    activities: {
      teachingAids: 'Solar system model, Projector',
      teachingActivities: 'Interactive solar system tour, Planet facts discussion',
      pupilActivities: 'Complete a planet fact sheet',
    },
  },
  {
    id: '7',
    title: 'Human Digestive System',
    description: 'A study of the human digestive system, its organs, and their functions.',
    duration: '50 minutes',
    subject: 'Biology',
    class: '11-6',
    objectives: [
      'Identify the organs in the digestive system.',
      'Explain how each organ functions in the process of digestion.',
      'Understand common digestive issues.',
    ],
    activities: {
      teachingAids: 'Anatomy model, Diagrams, Projector',
      teachingActivities: 'Lecture on organ functions, Group discussion',
      pupilActivities: 'Label digestive system parts on a diagram',
    },
  },
  {
    id: '8',
    title: 'Introduction to Programming',
    description:
      'Covers the basic concepts of programming, including variables, loops, and functions.',
    duration: '60 minutes',
    subject: 'Computer Science',
    class: '11-6',
    objectives: [
      'Understand variables and data types.',
      'Learn how to write simple loops and functions.',
      'Solve basic programming challenges.',
    ],
    activities: {
      teachingAids: 'Computers, Coding software',
      teachingActivities: 'Live coding demonstration, Explain basic algorithms',
      pupilActivities: 'Write a simple program in groups',
    },
  },
  {
    id: '9',
    title: 'Introduction to Geometry',
    description: 'Introduction to geometric shapes, angles, and their properties.',
    duration: '45 minutes',
    subject: 'Mathematics',
    class: '11-6',
    objectives: [
      'Identify basic geometric shapes.',
      'Understand properties of shapes and angles.',
      'Solve simple geometry problems.',
    ],
    activities: {
      teachingAids: 'Protractors, Rulers, Geometric shapes',
      teachingActivities: 'Hands-on activity with shapes, Problem-solving session',
      pupilActivities: 'Draw and measure angles',
    },
  },
  {
    id: '10',
    title: 'Exploring the Water Cycle',
    description:
      'Explains the water cycle, including evaporation, condensation, and precipitation.',
    duration: '50 minutes',
    subject: 'Geography',
    class: '10-3',
    objectives: [
      'Understand the stages of the water cycle.',
      'Explain the importance of the water cycle in nature.',
      'Create a diagram of the water cycle.',
    ],
    activities: {
      teachingAids: 'Water cycle diagram, Projector, Videos',
      teachingActivities: 'Lecture on the stages of the water cycle, Group discussion',
      pupilActivities: 'Draw and label the water cycle',
    },
  },
]
