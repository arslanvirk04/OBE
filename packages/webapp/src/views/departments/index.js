import { CButton, CCard, CCardBody, CSpinner } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDepartmentImportFile, getAllDepartments } from 'src/services/departments'
import DepartmentList from './departmentList'
import Papa from 'papaparse'

const allowedExtensions = ['csv']
const Departments = () => {
  const navigate = useNavigate()
  const [departmentData, setDepartmentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    GetDepartmentData()
  }, [])

  const GetDepartmentData = async () => {
    const response = await getAllDepartments()
    // console.log('GetDepartmentData', response)
    const data = response?.rows.map((row) => ({
      ...row,
      //   departmentName: row.Department?.name,
    }))
    console.log('data', data)
    setDepartmentData(data)
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
         ...row
      
          }))

          try {
            const response = await addDepartmentImportFile(data)
            setLoading(false)
            GetDepartmentData()
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
  const navigateToAddDepartment = () => {
    navigate('/departments/add')
  }

  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Department Data</h5>
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
                  <CSpinner  component="span" size="sm" aria-hidden="true" className="mr-1" />{' '}
                  Importing
                </>
              ) : (
                ' Import CSV'
              )}
            </CButton> */}
            <div className="mx-1">
              <CButton onClick={navigateToAddDepartment}>Add Department</CButton>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between">
          <DepartmentList departmentData={departmentData} GetDepartmentData={GetDepartmentData} />
        </CCardBody>
      </div>
    </CCard>
  )
}

export default Departments
