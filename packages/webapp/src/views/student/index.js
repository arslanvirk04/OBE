import { CButton, CCard, CCardBody } from '@coreui/react'
import { useEffect, useState } from 'react'
import { addImportFileStudent, getAllStudents } from 'src/services/student'
import StudentList from './studentList'
import { useNavigate } from 'react-router-dom'
import Papa from 'papaparse'
import { useRef } from 'react'
import { TextField } from '@mui/material'

const allowedExtensions = ['csv']
const Student = () => {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState([])
  const [data, setData] = useState([])
  const [columnArray, setColumnArray] = useState([])
  const [valuesArray, setValuesArray] = useState([])
  const [error, setError] = useState('')
  const csvDownloadRef = useRef(null)
  const [inputText, setInputText] = useState('')
  // const userName = useSelector((state) => state.auth?.loggedInUser?.name);

  useEffect(() => {
    GetStudentData()
  }, [])

  const GetStudentData = async () => {
    const response = await getAllStudents()
    console.log('GetStudentData', response)
    const data = response?.rows.map((row) => ({
      ...row,
    }))
    setStudentData(data)
  }
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)

    if (lowerCase === '') {
      GetStudentData()
    } else {
      const filteredData = studentData.filter((student) =>
        student.User?.name.toLowerCase().includes(lowerCase),
      )
      setStudentData(filteredData)
    }
  }
  console.log('studentData', studentData)

  const headers = [
    { label: 'Course Code', key: 'courseCode' },
    { label: 'Course Title', key: 'courseTitle' },
    { label: 'Credit Hours', key: 'creditHours' },
    { label: 'Course Type', key: 'courseType' },
    { label: 'Department', key: 'Department.name' },
    { label: 'Program', key: 'Program.name' },
    { label: 'Course Outline', key: 'courseOutline' },
    { label: 'Reference Books', key: 'reference_Book' },
    { label: 'Objective', key: 'objective' },
    { label: 'Description', key: 'description' },
    { label: 'Pre Req', key: 'Pre_Req' },
  ]

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
            registrationNo: row['Registration Number'],
            program: row.Program,
            session: row.Session,
            department: row.Department,
            city: row.City,
            contactNo: row['Contact Number'],
            address: row.Address,
          }))

          try {
            const response = await addImportFileStudent(data)

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
  const navigateToStudent = () => {
    navigate('/student/add')
  }

  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Student Data</h5>

        <div className="d-flex align-items-center">
          <div className="mx-2 pt-1">
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              placeholder="Search by Name"
              InputProps={{ style: { width: '150px', height: '34px' , borderRadius: '5px' } }}
            />
          </div>
          <div className="mx-1">
            <CButton onClick={navigateToStudent}>Add Student</CButton>
          </div>
        </div>
      </div>
      <CCardBody className="d-flex justify-content-between">
        <StudentList studentData={studentData} GetStudentData={GetStudentData} />
      </CCardBody>
    </CCard>
  )
}

export default Student
