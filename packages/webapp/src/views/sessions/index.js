import { CButton, CCard, CCardBody, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SessionList from './sessionList'
import { addImportFileSession, getAllSessions } from 'src/services/sessions'
import Papa from 'papaparse'


const allowedExtensions = ['csv']
const Session = () => {
  const navigate = useNavigate()
  const [sessionData, setSessionData] = useState([])
  const [data, setData] = useState([])
  const [columnArray, setColumnArray] = useState([])
  const [valuesArray, setValuesArray] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GetSessionData()
  }, [])

  const GetSessionData = async () => {
    const response = await getAllSessions()

    const data = response?.rows.map((row) => ({
      ...row,
    }))
    setSessionData(data)
    setLoading(false)
  }

  const handleFile = (event) => {
    if (event.target.files.length) {
      const inputFile = event.target.files[0]
      console.log('inputFile', inputFile)
      const fileExtension = inputFile?.name.split('.').pop().toLowerCase()
      console.log('fileExtension', fileExtension)
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a CSV file')
        console.log('setError', setError)
        setData([])
        setColumnArray([])
        setValuesArray([])
        return
      }

      Papa.parse(inputFile, {
        header: true,
        skipEmptyLines: true,
        complete: async function (result) {
          setLoading(true)
          console.log('Parsing complete:', result.data)
          const data = _.map(result.data, (row) => ({
            name: row.name,
  
          }))

          try {
            const response = await addImportFileSession(data)
            setLoading(false)
            GetSessionData()
            console.log('data', data)
            console.log('response', response)

            const columnArray = Object.keys(result.data[0])
            const valuesArray = result.data.map((data) => Object.values(data))
            setData(result.data)
            setColumnArray(columnArray)
            setValuesArray(valuesArray)
            setError('')
          } catch (error) {
            console.error('An error occurred:', error)
          }
        },
      })
    }
  }
  console.log('columnArray', columnArray)
  console.log('valuesArray', valuesArray)

  const navigateToAddSession = () => {
    navigate('/sessions/add')
  }
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Session Data</h5>
        <div>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

          <div className="d-flex justify-content-between ">
            {/* <CButton onClick={() => document.getElementsByName('file')[0].click()}>
            {loading ? (
                <>
                  <CSpinner component="span" size="sm" aria-hidden="true" className="mr-1" />{' '}
                  Importing
                </>
              ) : (
                ' Import CSV'
              )}
            </CButton> */}
            <div  className="mx-1"> 
            <CButton onClick={navigateToAddSession}>Add Session</CButton>
            </div>
          </div>
        </div>
      
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between">
          <SessionList sessionData={sessionData} GetSessionData={GetSessionData} />
        </CCardBody>
      </div>
    </CCard>
  )
}

export default Session
