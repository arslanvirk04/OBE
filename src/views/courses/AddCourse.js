import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { cilJustifyRight } from '@coreui/icons'
import { addCourse, getOne } from 'src/services/courses'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from 'src/services/departments'
import { getAllPrograms } from 'src/services/programs'

const AddCourse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [departments, setDepartments] = useState()
  const [ programs,  setPrograms] = useState([])
  const [formData, setFormData] = useState({
    id: null,
    courseCode: null,
    courseTitle: null,
    creditHours: null,
    courseType: null,
    programName : null,
    programId : null,
    referenceBooks: null,
    preReq: null,
    departmentId: null,
    departmentName: null,
    clo: null,
    actions: null,
  })

  useEffect(() => {
    getDeptData(),
    getProgramData(),
     console.log('params', params)
    // Fetch student details and populate the form fields when the component mounts
    if (params.courseId) {
      getCourseDetails(params.courseId)
    }
  }, [params.courseId])

  const getProgramData = async () => {
    const getData = await getAllPrograms()

    const pgr = [
      {
        label: 'Select Program',
        value: null,
      },
    ]
    getData.rows.map((row) => {
      pgr.push({
        label: row.name,
        value: row.id,
      })
    })
    setPrograms(pgr)
  }

  const getDeptData = async () => {
    try {
      const response = await getAllDepartments()
      console.log('response', response)
      const dpt = [
        {
          label: 'Select Department',
          value: null,
        },
      ]
      response.departments.rows.map((row) => {
        dpt.push({
          label: row.name,
          value: row.id,
        })
      })
      setDepartments(dpt)
    } catch (error) {}
  }

  const getCourseDetails = async (courseId) => {
    try {
      const courseData = await getOne(courseId)
      console.log('courseData', courseData)
      setFormData({
        id: courseData.id,
        courseCode: courseData.courseCode || '',
        courseTitle: courseData.courseTitle || '',
        creditHours: courseData.creditHours || '',
        courseType: courseData.courseType || '',
        programId: courseData.programId || '',
        programName: courseData.Program?.name || '',
        departmentName: courseData.Department?.name || '',
        departmentId: courseData.departmentId || '',
        referenceBooks: courseData.referenceBooks || '',
        clo: courseData.clo || '',
        preReq: courseData.preReq || '',
        actions: courseData.actions || '',
      })
    } catch (err) {}
  }

  const handleChange = (event) => {
    const { id, value } = event.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('before', formData)
    const response = await addCourse(formData)
    console.log('after adding ', response)
    navigate('/courses')
  }
  const navigateToCourses = () => {
    navigate(-1)
  }
  return (
    <div className="form-container mb-0">
      <CForm onSubmit={handleSubmit}>
        <div>
          <DocsExample href="forms/layout#gutters">
            <CRow>
              <CCol>
                <CFormLabel htmlFor="courseCode"><h6>Course Code</h6></CFormLabel>
                <CFormInput
                  name="name"
                  id="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputAddress"><h6>Course title</h6></CFormLabel>
                <CFormInput
                  name="name"
                  id="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText"><h6>Course Outline</h6></CFormLabel>
                <CFormInput
                  type="text"
                  id="courseOutline"
                  value={formData.courseOutline}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="inputName"><h6>Course Type</h6></CFormLabel>
                <CFormInput
                  name="name"
                  id="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText"><h6>Program</h6></CFormLabel>
                <CFormSelect
                  type="text"
                  id="programId"
                  aria-label="Default select example"
                  value={formData.programId}
                  onChange={handleChange}
                  options={programs}
                  required
                />
              </CCol>

              <CCol>
                <CFormLabel htmlFor="inputText"><h6>Reference Books</h6></CFormLabel>
                <CFormInput
                  type="text"
                  id="referenceBooks"
                  value={formData.referenceBooks}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="departmentName"><h6>Department</h6></CFormLabel>
                <CFormSelect
                  type="text"
                  id="departmentId"
                  aria-label="Default select example"
                  value={formData.departmentId}
                  onChange={handleChange}
                  options={departments}
                  required
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText"><h6>CLO</h6></CFormLabel>
                <CFormInput 
                type="text" 
                id="clo" 
                value={formData.clo}
                 onChange={handleChange}
                  />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputCity"><h6>Credit Hours</h6></CFormLabel>
                <CFormInput
                  name="name"
                  id="creditHours"
                  value={formData.creditHours}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="inputText"><h6>Pre Req</h6></CFormLabel>
                <CFormInput
                  type="text"
                  id="preReq"
                  value={formData.preReq}
                  onChange={handleChange}
                />
              </CCol>
              <CCol></CCol>
              <CCol></CCol>
            </CRow>

            <CRow>
              <CCol></CCol>
              <CCol>
                <div className="d-flex w-100 gap-2 justify-content-end pt-3">
                  <div xs="auto">
                    <CButton onClick={navigateToCourses}>Cancel</CButton>
                  </div>
                  <div xs="auto">
                    <CButton type="submit">Submit</CButton>
                  </div>
                </div>
              </CCol>
              <CCol></CCol>
            </CRow>
          </DocsExample>
        </div>
      </CForm>
    </div>
  )
}
export default AddCourse
