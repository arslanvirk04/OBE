import React, { useEffect, useState } from 'react'
import { CButton, CCard, CForm, CCol, CFormLabel, CRow, CFormSelect } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { DocsExample } from 'src/components'
import { addCurriculum } from 'src/services/curriculum'
import { getAllPrograms } from 'src/services/programs'
import { getAllCourses } from 'src/services/courses'
// import MultiSelectDropdown from '../MultiSelectDropdown'
import Select from 'react-select';
import _ from 'lodash'

const AddCurriculum = () => {
  const navigate = useNavigate()
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
  }, [])
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
    console.log('semesters 1', semesters)
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
    const response = await addCurriculum(curriculum)
    console.log('response', response)
    navigate('/curriculum')
  }
  const handleCourseChange = (options, index) => {
    const semestersCopy = _.cloneDeep(curriculum.semesters);
    // Save the selected courses for the current semester
    semestersCopy[index] = {
      semester: index + 1,
      courses: options.map(option => option.value),
    };
    // Remove the selected courses from all subsequent semesters
    for (let i = index + 1; i < semestersCopy.length; i++) {
      semestersCopy[i].courses = semestersCopy[i].courses.filter(courseId =>
        !options.some(option => option.value === courseId)
      );
    }
    setCurriculum(prevFormData => ({
      ...prevFormData,
      semesters: semestersCopy,
    }));
    console.log('options', options)
    console.log('index', index)
  };
  const handleChange = (event) => {
    const { id, value } = event.target
    setCurriculum((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  console.log('curriculum', curriculum)
  console.log('semesters', semesters)
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
  const getCoursesOptions = semesterIndex => {
    const selectedCoursesEarlierSemesters = [];
    for (let i = 0; i < semesterIndex; i++) {
      selectedCoursesEarlierSemesters.push(...curriculum.semesters[i]?.courses || []);
    }
    console.log("selectedCoursesEarlierSemesters", selectedCoursesEarlierSemesters);
    return courses.filter(course => !selectedCoursesEarlierSemesters.includes(course.value));
   
  };

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
                <CFormSelect id="year" onChange={handleChange} >
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
                    onChange={(value) => handleCourseChange(value, index)}
                    // value={selectedOptions}
                  />
                </CCol>
              ))}
            </CRow>
            
            <CRow className="row g-3 my-3 justify-content-end px-5">
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
