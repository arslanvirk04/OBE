import { CButton, CCard, CCardBody, CSpinner } from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addCurriculumImportFile, getAllCurriculums } from 'src/services/curriculum'
import CurriculumList from './CuurriculumList'
import { useState } from 'react'
import { useEffect } from 'react'
import Papa from 'papaparse'


const allowedExtensions = ['csv']
const Curriculum = () => {
  const navigate = useNavigate()
  const [curriculumData, setCurriculumData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GetCurriculumData()
  }, [])
  
  const GetCurriculumData = async () => {
    const res = await getAllCurriculums()
    console.log('curriculumData', res)
    const data = res.rows.map((row) => ({
      ...row,
    }))
    setCurriculumData(data)
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
            year: row.Year,
            program : row.Program
  
          }))

          try {
            const response = await addCurriculumImportFile(data)
            setLoading(false)
            GetCurriculumData()
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
  const navigateToAddCurriculum = () => {
    navigate('/curriculum/add')
  }
 
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Curriculum Data</h5>
        <div>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFile}
            style={{ display: 'none' }}
          />

        <div className="d-flex justify-content-between ">
            <CButton onClick={() => document.getElementsByName('file')[0].click()}>
            {loading ? (
                <>
                  <CSpinner component="span" size="sm" aria-hidden="true" className="mr-1" />{' '}
                  Importing
                </>
              ) : (
                ' Import '
              )}
            </CButton>
            <div  className="mx-1"> 
            <CButton onClick={navigateToAddCurriculum}>Add Curriculum</CButton>
            </div>
          </div>
          </div>
      </div>
      <CCardBody className="d-flex justify-content-between">
        <CurriculumList curriculumData={curriculumData} GetCurriculumData={GetCurriculumData} />
      </CCardBody>
     
    </CCard>
  )
}

export default Curriculum
