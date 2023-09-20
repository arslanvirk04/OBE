import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CSpinner, CSmartPagination } from '@coreui/react'
import { addImportFileCourses, getAllCourses } from 'src/services/courses'
import { useNavigate } from 'react-router-dom'
import Papa from 'papaparse'
import CourseList from './CourseList'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { CSVLink } from 'react-csv'
import { useRef } from 'react'
import { TextField } from '@mui/material'

const allowedExtensions = ['csv']
const Courses = () => {
  const navigate = useNavigate()
  const [courseData, setCourseData] = useState([])
  const [data, setData] = useState([])
  const [columnArray, setColumnArray] = useState([])
  const [valuesArray, setValuesArray] = useState([])
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(2)
  const [loading, setLoading] = useState(false)
  const csvDownloadRef = useRef(null)
  const [inputText, setInputText] = useState('')
  useEffect(() => {
    GetCoursesData()
  }, [])

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)

    if (lowerCase === '') {
      GetCoursesData()
    } else {
      const filteredData = courseData.filter((course) =>
        course.courseTitle.toLowerCase().includes(lowerCase),
      )
      setCourseData(filteredData)
    }
  }
  const inputHandlerCode = (e) => {
    const lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)

    if (lowerCase === '') {
      GetCoursesData()
    } else {
      const filteredData = courseData.filter((course) =>
        course.courseCode.toLowerCase().includes(lowerCase),
      )
      setCourseData(filteredData)
    }
  }

  console.log('courseData', courseData)

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
  const GetCoursesData = async () => {
    const res = await getAllCourses()

    const data = res?.rows.map((row) => ({
      ...row,
    }))

    setCourseData(data)
    setCount(res.count)
    setLimit(limit)
    setPage(page)
    setLoading(false)
  }
  console.log('data', data)

  const exportData = async () => {
    setLoading(true)
    const res = await getAllCourses()
    setTimeout(() => {
      csvDownloadRef.current.link.click()
    }, 1000)
    setLoading(false)
  }
  const totalPages = Math.ceil(count / limit)
  const pageArray = Array.from({ length: totalPages }, (_, index) => index + 1)
  const handlePageChange = (newPage) => {
    setPage(newPage)
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
            courseCode: row['Course Code'],
            courseTitle: row['Course Title'],
            creditHours: row['Credit Hours'],
            courseType: row['Course Type'],
            department: row.Department,
            program: row.Program,
            courseOutline: row['Course Outline'],
            reference_Book: row['Reference Books'],
            Pre_Req: row['Pre Req'],
          }))

          try {
            const response = await addImportFileCourses(data)
            setLoading(false)
            GetCoursesData()
            // console.log('data', data)
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
  // console.log('columnArray', columnArray)
  // console.log('valuesArray', valuesArray)
  const navigateToAddCourse = () => {
    navigate('/courses/add')
  }

  return (
    <>
      <CCard>
        <div className="d-flex justify-content-between align-items-center p-3 pb-0">
          <h5 className="m-0">Course Data</h5>

          <div className="d-flex  align-items-center">
            <div className="pt-1">
              <TextField
                id="outlined-basic"
                onChange={inputHandlerCode}
                variant="outlined"
                placeholder="Search by Code"
                InputProps={{ style: { width: '150px', height: '34px' , borderRadius: '5px'  } }}
              />
            </div>
            <div className="mx-2 pt-1">
              <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                placeholder="Search by Title"
                InputProps={{ style: { width: '150px', height: '34px' , borderRadius: '5px' } }}
              />
            </div>
       

          <div className="d-flex align-items-center">
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            <CSVLink
              data={courseData}
              headers={headers}
              ref={csvDownloadRef}
              target="_blank"
              filename="data.csv"
            />
            <div className="d-flex justify-content-between">
              <CButton onClick={exportData}>
                {loading ? (
                  <>
                    <CSpinner component="span" size="sm" aria-hidden="true" className="mr-1" />{' '}
                    Exporting
                  </>
                ) : (
                  ' Export '
                )}
              </CButton>
              <div className="mx-2">
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
              </div>
              <div>
                <CButton onClick={navigateToAddCourse}>Add Course</CButton>
              </div>
            </div>
          </div>
          </div>
        </div>
        <CCardBody className="d-flex justify-content-between">
          <CourseList
            courseData={courseData}
            GetCoursesData={GetCoursesData}
            page={page}
            count={count}
            pageArray={pageArray}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            input={inputText}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Courses
