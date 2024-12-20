import CourtOfArms from '@/assets/images/court_of_arms.png'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Asset } from 'expo-asset'
import { ProfileData } from '@/components/ProfilePage/Profile'
import * as Print from 'expo-print'
import { ROWData, ROWEntry } from '../CreatePage/CreateRecordsOfWork'

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

export const generateROWHTML = async (row: ROWData, teacherProfile: ProfileData) => {
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
            }
            .heading {
              text-align: center;
            }
            h1 { color: #333; }
            .sow-info {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: 4;
              justify-content: space-evenly;

            }
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
              padding: 10px;
            }
          </style>
        </head>
        <body>
        <div class="content-wrapper">
        <img src="${imageBase64}" alt="Court of Arms" style="width: 50px; height: 50px; display: block; margin: 0 auto;" />
          <div class="heading">
            <h3>Ministry of General Education</h3>
            <h3>${teacherProfile.schoolName}</h3>
            <h3>Records Of Work</h3>
          </div>
          <div class="sow-info">
            <p><strong>Subject:</strong>${' '}${row.subject}</p>
            <p><strong>Grade:</strong>${' '}${row.grade}</p>
            <p><strong>Term:</strong>${' '}${row.term}</p>
            <p><strong>Year:</strong>${' '}${row.year}</p>
            <p><strong>Teacher:</strong>${' '}${teacherProfile.salutation}${' '}${teacherProfile.firstName}${' '}${teacherProfile.lastName}</p>
          </div>
   
          <table>
            <tr>
              <th>Week/Ending</th>
              <th>Work Covered</th>
              <th>Comments on Resources/References</th>
              <th>Method Strategies</th>
              <th>Comments on Learners' Progress</th>
              <th>HOD's Remarks</th>
            </tr>
           ${row.entries
             .map(
               (entry: ROWEntry) => `
             <tr>
               <td>${entry.week}</td>
               <td>${entry.workCovered}</td>
               <td>${entry.commentsOnResourcesReferences}</td>
               <td>${entry.methodStrategies}</td>
                <td>${entry.commentsOnLearnersProgress}</td>
                <td>${entry.hodRemarks}</td>
             </tr>
           `
             )
             .join('')}
         
          </table>
       
          </div>
          <footer class="footer">
          Powered by TeachScribe
          </footer>
        </body>
      </html>
    `
}

export const generateAndSharePDF = async (sow: ROWData, teacherProfile: ProfileData) => {
  try {
    const html = await generateROWHTML(sow, teacherProfile)
    const { uri } = await Print.printToFileAsync({ html })
    console.log('PDF file has been generated:', uri)
    await shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Share your records of work',
    })
  } catch (error) {
    console.error('Error generating or sharing PDF:', error)
  }
}
