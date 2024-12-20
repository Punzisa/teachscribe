import CourtOfArms from '@/assets/images/court_of_arms.png'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Asset } from 'expo-asset'
import { ProfileData } from '@/components/ProfilePage/Profile'
import * as Print from 'expo-print'
import { SOWData, SOWEntry } from '../CreatePage/CreateSchemesOfWork'

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

export const generateSOWHTML = async (sow: SOWData, teacherProfile: ProfileData) => {
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
          <h3>Schemes Of Work</h3>
          </div>
          <div class="sow-info">
            <p><strong>Subject:</strong>${' '}${sow.subject}</p>
            <p><strong>Grade:</strong>${' '}${sow.grade}</p>
            <p><strong>Term:</strong>${' '}${sow.term}</p>
            <p><strong>Year:</strong>${' '}${sow.year}</p>
            <p><strong>Teacher:</strong>${' '}${teacherProfile.salutation}${' '}${teacherProfile.firstName}${' '}${teacherProfile.lastName}</p>
          </div>
   
          <table>
            <tr>
              <th>Week</th>
              <th>Topics/Sub-Topics</th>
              <th>Expected Learning Outcome</th>
              <th>Methodology</th>
              <th>Expected Experiments</th>
              <th>Reference</th>
            </tr>
           ${sow.entries
             .map(
               (entry: SOWEntry) => `
             <tr>
               <td>${entry.week}</td>
               <td>${entry.topics}</td>
               <td>${entry.learningOutcome}</td>
               <td>${entry.methodology}</td>
                <td>${entry.expectedExperiments}</td>
                <td>${entry.reference}</td>
             </tr>
           `
             )
             .join('')}
            </tr>
         
          </table>
       
          </div>
          <footer class="footer">
          Powered by TeachScribe
          </footer>
        </body>
      </html>
    `
}

export const generateAndSharePDF = async (sow: SOWData, teacherProfile: ProfileData) => {
  try {
    const html = await generateSOWHTML(sow, teacherProfile)
    const { uri } = await Print.printToFileAsync({ html })
    console.log('PDF file has been generated:', uri)
    await shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf',
      dialogTitle: 'Share your schemes of work',
    })
  } catch (error) {
    console.error('Error generating or sharing PDF:', error)
  }
}
