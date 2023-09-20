import { CButton, CCard, CCardBody, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgramList from './programList'
import { addProgramImportFile, getAllPrograms } from 'src/services/programs'
import Papa from 'papaparse'

const allowedExtensions = ['csv']
const Program = () => {
  const navigate = useNavigate()
  const [programData, setProgramData] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [columnArray, setColumnArray] = useState([])
  const [valuesArray, setValuesArray] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    GetProgramData()
  }, [])

  const GetProgramData = async () => {
    const response = await getAllPrograms()

    const data = response?.rows.map((row) => ({
      ...row,
    }))
    setProgramData(data)
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
            name: row.Name,
            semesters: row.Semesters,
          }))

          try {
            const response = await addProgramImportFile(data)
            setLoading(false)
            GetProgramData()
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

  const navigateToAddProgram = () => {
    navigate('/programs/add')
  }
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Program Data</h5>
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
            <div className="mx-1">
              <CButton onClick={navigateToAddProgram}>Add Program</CButton>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between">
          <ProgramList programData={programData} GetProgramData={GetProgramData} />
        </CCardBody>
      </div>
    </CCard>
  )
}

export default Program
