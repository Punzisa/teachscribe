import CourtOfArms from '@/assets/images/court_of_arms.png'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Asset } from 'expo-asset'
import { LearningDevelopment, LessonData } from '../forms/LessonPlan/LessonPlan'
import { ProfileData } from '../ProfilePage/Profile'
import * as Print from 'expo-print'

const getImageBase64 = async () => {
  try {
    const asset = Asset.fromModule(CourtOfArms)
    await asset.downloadAsync()

    if (asset.localUri) {
      const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      })
      return `data:image/png;base64,${base64}`
    }
    return null
  } catch (error) {
    console.error('Error converting image to base64:', error)
    return null
  }
}

export const generateLessonHTML = async (lessonData: LessonData, teacherProfile: ProfileData) => {
  const imageBase64 = await getImageBase64()

  return `
      <html>
        <head>
             <style>
             html, body {
              height: 100%;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              margin: 0;
              display: flex;
              flex-direction: column;
            }
              .content-wrapper {
              flex: 1 0 auto;
              margin: 5px;
              padding-left: 20px;
            }
              .heading {
              text-align: center;
            }
            h1 { color: #333; }
            .lesson-info { margin-bottom: 5px; padding: 10px 0; }
            .lesson-content { line-height: 1.2; }
            .footer {
              flex-shrink: 0;
              padding: 10px 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #eee;
            }
              table, td, th {  
              border: 1px solid #ddd;
              text-align: left;
            }
            table {
              border-collapse: collapse;
              width: 95%;
               margin: 0 auto;

            }
            th, td {
              padding: 5px;
            }
          </style>
        </head>
        <body>
        <div class="content-wrapper">
        <img src="${imageBase64}" alt="Court of Arms" style="width: 50px; height: 50px; display: block; margin: 0 auto;" />
          <div class="heading">
          <h3>Ministry of Education</h3>
          <h3>${teacherProfile.schoolName}</h3>
          <h3>Lesson Plan</h3>
          </div>
          <div class="lesson-info">
            <p><strong>Date:</strong> ${lessonData.date.toDateString()}</p>
            <p><strong>Teacher Name:</strong> ${teacherProfile.salutation} ${teacherProfile.firstName} ${teacherProfile.lastName}</p>
            <p><strong>Class:</strong> ${lessonData.class}</p>
            <p><strong>Subject:</strong> ${lessonData.subject}</p>
            <p><strong>Title:</strong> ${lessonData.title}</p>
            <p><strong>Time:</strong> ${lessonData.date.toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> ${lessonData.duration}</p>
            <p><strong>Resources:</strong> ${lessonData.resources}</p>
            <p><strong>References:</strong> ${lessonData.resources}</p>
          </div>

          <div class="lesson-content">
            <h4>Description:</h4>
              ${lessonData.description}
            <h4>Major Learning Outcome:</h4>
              ${lessonData.majorLearningOutcome}
            <h4>Evidence of Attainment:</h4>
              ${lessonData.evidenceOfAttainment}
            <h4>Rationale:</h4>
              ${lessonData.rationale}
            
            <h4>Lesson Development</h4>
            <table>
              <tr>
                <th>Time</th>
                <th>Teacher Activities</th>
                <th>Learner Activities</th>
              </tr>
              ${lessonData.learningDevelopmentEntries
                .map(
                  (entry: LearningDevelopment) => `
                <tr>
                  <td>${entry.time}</td>
                  <td>${entry.teacherActivites}</td>
                  <td>${entry.learnerActivities}</td>
                </tr>
              `
                )
                .join('')}
                </tr>
            </table>
        
            <h4>Teacher Evaluation</h4>
            ${lessonData.teacherEvaluation}
            <h4>Pupil Evaluation</h4>
            ${lessonData.pupilEvaluation}
            
          </div>
        </div>
        <footer class="footer">
          Powered by TeachScribe
        </footer>
        </body>
      </html>
    `
}

export const generateAndSharePDF = async (lessonData: LessonData, teacherProfile: ProfileData) => {
  try {
    const html = await generateLessonHTML(lessonData, teacherProfile)
    const { uri } = await Print.printToFileAsync({ html })
    console.log('PDF file has been generated:', uri)
    await shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Share your lesson plan',
    })
  } catch (error) {
    console.error('Error generating or sharing PDF:', error)
  }
}
