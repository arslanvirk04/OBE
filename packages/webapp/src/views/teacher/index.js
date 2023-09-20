import { CButton, CCard, CCardBody } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addImportFileTeacher, getAllTeachers } from 'src/services/faculty'
import TeacherList from './TeacherList'
import Papa from 'papaparse'
import dayjs from 'dayjs'
import { TextField } from '@mui/material'

const allowedExtensions = ['csv']
const Teacher = () => {
  const navigate = useNavigate()
  const [teacherData, setTeacherData] = useState([])
  const [data, setData] = useState([])
  const [columnArray, setColumnArray] = useState([])
  const [valuesArray, setValuesArray] = useState([])
  const [error, setError] = useState('')
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    GetTeacherData()
  }, [])

  const GetTeacherData = async () => {
    const response = await getAllTeachers()
    console.log('GetTeacherData', response)
    const data = response?.rows.map((row) => ({
      ...row,
    }))
    setTeacherData(data)
  }

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)

    if (lowerCase === '') {
      GetTeacherData()
    } else {
      const filteredData = teacherData.filter((teacher) =>
        teacher.User?.name.toLowerCase().includes(lowerCase),
      )
      setTeacherData(filteredData)
    }
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
          console.log('Parsing complete:', result.data)
          const data = _.map(result.data, (row) => ({
            name: row.Name,
            email: row.Email,
            department: row.Department,
            designation: row.Designation,
            areaOfSpecialization: row['Area of Specialization'],
            joiningDate: dayjs(row['Joining Date'], { strict: true }).format('YYYY-MM-DD'),

            experience: row.Experience,
            teachingPlan: row['Teaching Plan'],
            coursesOffering: row['Courses Offering'],
            contactNo: row['Contact Number'],
            address: row.Address,
            city: row.City,
          }))

          try {
            const response = await addImportFileTeacher(data)

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

  const navigateToTeacher = () => {
    navigate('/teacher/add')
  }

  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Teacher Data</h5>
  
      <div className="d-flex align-items-center">
      <div className="mx-2 pt-1">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            placeholder="Search by Name"
            InputProps={{ style: { width: '150px', height: '33px', borderRadius: '6px'  } }}
          />
        </div>
     
          <div className="d-flex justify-content-between">
            <div className="mx-1">
              <CButton onClick={navigateToTeacher}>Add Teacher</CButton>
            </div>
          </div>
   
      </div>
      </div>
      <CCardBody className="d-flex justify-content-between">
        <TeacherList teacherData={teacherData} GetTeacherData={GetTeacherData} />
      </CCardBody>
    </CCard>
  )
}

export default Teacher
