import React, { useEffect, useState } from 'react'
import { CButton, CCard, CForm, CCol, CFormLabel, CRow, CFormSelect } from '@coreui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsExample } from 'src/components'
import { addCurriculum, getOneCurriculum } from 'src/services/curriculum'
import { getAllPrograms } from 'src/services/programs'
import { getAllCourses } from 'src/services/courses'
import Select from 'react-select'
import _ from 'lodash'

const AddCurriculum = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [programs, setPrograms] = useState()
  const [courses, setCourses] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [semesters, setSemesters] = useState([])
  const [errors, setErrors] = useState({})

  const [curriculum, setCurriculum] = useState({
    year: null,
    programId: null,
    semesters: [],
  })

  useEffect(() => {
    getProgramData()
    getCourseData()
    console.log('params', params)
    if (params.curriculumId) {
      getCurriculumDetails(params.curriculumId)
    }
  }, [params.curriculumId])

  const getCourseData = async () => {
    const getCourseData = await getAllCourses()
    const course = []
    getCourseData.rows.map((row) => {
      course.push({
        label: row.courseTitle,
        value: row.id,
      })
    })
    setCourses(course)
  }
  const getProgramData = async () => {
    const getData = await getAllPrograms()
    const pgr = [
      {
        label: 'Select Program',
        value: null,
      },
    ]
    getData.rows.map((row) =>
      pgr.push({
        label: row.name,
        value: row.id,
        semesters: +row.semesters,
      }),
    )
    setPrograms(pgr)
  }
  const getCurriculumDetails = async (curriculumId) => {
    try {
      
      const curriculumData = await getOneCurriculum(curriculumId)

      const semesters = []
      for (const semester of curriculumData.CurriculumSemester) {
        const courses = _.map(semester.CurriculumSemesterCourse, 'courseId')
        semesters.push({ ...semester, courses })
      }

      console.log('semesters', semesters)
      setCurriculum({
        year: curriculumData.year || '',
        programId: curriculumData.programId || '',
        semesters,
      })
      setSemesters(
        Array.from({ length: curriculumData.CurriculumSemester.length }, (_, index) => index + 1),
      )

      ///change
      // setCourses(CurriculumSemester)
    } catch (err) {}
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = {}
    if (!curriculum.year) {
      validationErrors.year = 'Year is required !'
    }
    if (!curriculum.programId) {
      validationErrors.programId = 'Program is required !'
    }
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }
    if (params.curriculumId) {
      curriculum.id = params.curriculumId;
    }

    const response = await addCurriculum(curriculum)

    console.log('response: ', response)
    navigate('/curriculum')
  }

  const handleCourseChange = (options, index) => {
    const semestersCopy = _.cloneDeep(curriculum.semesters)
    // console.log('options ', options)
    // console.log('index ', index)
    console.log('semestersCopy', semestersCopy)
    // Save the selected courses for the current semester
    semestersCopy[index] = {
      ...semestersCopy[index],
      semester: index + 1,
      courses: options.map((option) => option.value),
    }
    // console.log('semestersCopy[index]', semestersCopy[index])

    // Remove the selected courses from all subsequent semesters
    for (let i = index + 1; i < semestersCopy.length; i++) {
      semestersCopy[i].courses = semestersCopy[i].courses.filter(
        (courseId) => !options.some((option) => option.value === courseId),
      )
      // console.log('semestersCopy[i].courses', semestersCopy[i].courses)
    }
    setCurriculum((prevFormData) => ({
      ...prevFormData,
      semesters: semestersCopy,
    }))
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setCurriculum((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  const handleProgramChange = (event) => {
    const selectedProgramId = event.target.value
    setSelectedProgram(selectedProgramId)
    const selectedProgramObj = programs.find((program) => program.value === selectedProgramId)
    if (selectedProgramObj) {
      const numSemesters = selectedProgramObj.semesters || 0
      setSemesters(Array.from({ length: numSemesters }, (_, index) => index + 1))
    }
    setCurriculum((prevFormData) => ({
      ...prevFormData,
      programId: selectedProgramId,
    }))
  }
  const navigateToCurriculum = () => {
    navigate(-1)
  }
  const yearOptions = []
  for (let year = 2014; year <= 2030; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    )
  }
  const getCoursesOptions = () => {
    const selectedCourses = []
    // console.log('curriculum.semesters', curriculum.semesters)
    for (const semester of curriculum.semesters) {
      // console.log('semester?.courses', semester?.courses)

      if (semester?.courses) {
        selectedCourses.push(...semester?.courses)
      }
    }
    // console.log('selectedCourses', selectedCourses)
    return courses.filter((course) => !selectedCourses.includes(course.value))
  }
  console.log('curriculum', curriculum)

  return (
    <div className="form-container">
      <CCard>
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <DocsExample href="forms/layout#gutters">
            <CRow>
              <h4>Create Curriculum</h4>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="year">
                  <h6>Year</h6>
                </CFormLabel>
                <CFormSelect id="year" onChange={handleChange} value={curriculum.year}>
                  <option value="">Select a year</option>
                  {yearOptions}
                </CFormSelect>
                {errors.year && <div className="error-message">{errors.year}</div>}
              </CCol>
              <CCol>
                <CFormLabel htmlFor="program">
                  <h6>Program</h6>
                </CFormLabel>
                <CFormSelect
                  id="programId"
                  onChange={handleProgramChange}
                  options={programs}
                  value={curriculum.programId}
                  required
                />
                {errors.programId && <div className="error-message">{errors.programId}</div>}
              </CCol>
              <CCol></CCol>
            </CRow>
            <CRow className="row g-3 py-3" lg={{ cols: 4 }}>
              {semesters.map((semester, index) => (
                <CCol key={index}>
                  <h6>Semester {semester}</h6>
                  <Select
                    options={getCoursesOptions(index)}
                    label={'Course'}
                    isMulti
                    required
                    defaultValue={_.map(
                      curriculum?.semesters[index]?.CurriculumSemesterCourse,
                      (row) => ({
                        label: row?.Course?.courseTitle,
                        value: row?.Course?.id,
                      }),
                    )}
                    onChange={(value) => handleCourseChange(value, index)}
                  />
                </CCol>
              ))}
            </CRow>

            <CRow className="row g-2 my-3 justify-content-end px-4">
              <CCol xs="auto">
                <CButton onClick={navigateToCurriculum}>Cancel</CButton>
              </CCol>
              <CCol xs="auto">
                <CButton type="submit">Submit </CButton>
              </CCol>
            </CRow>
          </DocsExample>
        </CForm>
      </CCard>
    </div>
  )
}
export default AddCurriculum
