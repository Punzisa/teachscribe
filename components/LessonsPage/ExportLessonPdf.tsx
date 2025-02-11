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
              background-color: #f9f9f9;
            }
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              margin: 0;
              display: flex;
              flex-direction: column;
              color: #333;
            }
            .content-wrapper {
              flex: 1 0 auto;
              margin: 20px;
              padding: 30px;
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .heading {
              text-align: center;
              margin-bottom: 30px;
            }
            .heading h3 {
              margin: 10px 0;
              color: #2c3e50;
            }
            .lesson-info {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
            }
            .lesson-info p {
              margin: 8px 0;
              line-height: 1.6;
            }
            .lesson-info strong {
              color: #2c3e50;
              min-width: 120px;
              display: inline-block;
            }
            .lesson-content {
              line-height: 1.6;
            }
            .lesson-content h4 {
              color: #2c3e50;
              border-bottom: 2px solid #e9ecef;
              padding-bottom: 8px;
              margin-top: 25px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 20px 0;
              background-color: white;
            }
            th {
              background-color: #f1f4f6;
              color: #2c3e50;
              font-weight: 600;
              padding: 12px;
              border: 1px solid #dee2e6;
            }
            td {
              padding: 12px;
              border: 1px solid #dee2e6;
              vertical-align: top;
            }
            tr:nth-child(even) {
              background-color: #f8f9fa;
            }
            tr:hover {
              background-color: #f2f2f2;
            }
            .footer {
              flex-shrink: 0;
              padding: 15px 20px;
              text-align: center;
              font-size: 12px;
              color: #6c757d;
              border-top: 1px solid #dee2e6;
              background-color: white;
              margin-top: 20px;
            }
            .logo {
              width: 70px;
              height: 70px;
              display: block;
              margin: 0 auto 20px auto;
              object-fit: contain;
            }
            @media print {
              body {
                background-color: white;
              }
              .content-wrapper {
                box-shadow: none;
                margin: 0;
                padding: 20px;
              }
              .lesson-info {
                background-color: white;
                border: 1px solid #dee2e6;
              }
            }
          </style>
        </head>
        <body>
          <div class="content-wrapper">
            <img src="${imageBase64}" alt="Court of Arms" class="logo" />
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
              <h4>Description</h4>
              <div>${lessonData.description}</div>

              <h4>Major Learning Outcome</h4>
              <div>${lessonData.majorLearningOutcome}</div>

              <h4>Evidence of Attainment</h4>
              <div>${lessonData.evidenceOfAttainment}</div>

              <h4>Rationale</h4>
              <div>${lessonData.rationale}</div>
              
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
              </table>
          
              <h4>Teacher Evaluation</h4>
              <div>${lessonData.teacherEvaluation}</div>

              <h4>Pupil Evaluation</h4>
              <div>${lessonData.pupilEvaluation}</div>
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
