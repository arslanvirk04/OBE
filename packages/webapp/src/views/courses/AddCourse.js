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
import CIcon from '@coreui/icons-react'
import { DocsExample } from 'src/components'
import { cibAddthis, cilJustifyRight, cilMinus, cilTrash, cilXCircle } from '@coreui/icons'
import { addCourse, getOne } from 'src/services/courses'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from 'src/services/departments'
import { getAllPrograms } from 'src/services/programs'
import { FaMinusCircle, FaPlusCircle, FaReact } from 'react-icons/fa'

const AddCourse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [departments, setDepartments] = useState()
  const [programs, setPrograms] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState()
  const [limit, setLimit] = useState(2)
  const [loading, setLoading] = useState(false)
  const [cloList, setCloList] = useState([{ objective: '', description: '' }])
  const [formData, setFormData] = useState({
    id: null,
    courseCode: null,
    courseTitle: null,
    creditHours: null,
    courseType: null,
    courseOutline: null,
    programName: null,
    programId: null,
    referenceBooks: null,
    preReq: null,
    departmentId: null,
    departmentName: null,
    actions: null,
    objective: null,
    description: null,
  })
  console.log('formData', formData)
  useEffect(() => {
    getDeptData(), 
    getProgramData(),
     console.log('params', params)
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
      response.rows.map((row) => {
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
      const cloData = courseData.Clo || []
      console.log('cloData', cloData)

      setFormData({
        ...courseData,
        preReq : courseData.Pre_Req,
        referenceBooks : courseData.reference_Book,
        programName: courseData.Program?.name || '',
        departmentName: courseData.Department?.name || '',
      })
      setCloList(cloData)
      console.log("cloData",cloData);
    
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
    // const response = await addCourse(formData)
    const response = await addCourse({ courseData: formData, cloList })
    navigate('/courses')
  }

  const handleCloChange = (index, field, value) => {
    const updatedClos = [...cloList]
    updatedClos[index][field] = value
    setCloList(updatedClos)
    console.log('updatedClos', updatedClos)
  }

  const addClo = () => {
    setCloList([...cloList, { objective: '', description: '' }])
    console.log('cloList', cloList)
  }

  const removeClo = (index) => {
    const updatedClos = [...cloList]
    updatedClos.splice(index, 1)
    setCloList(updatedClos)
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
                <CFormLabel htmlFor="courseCode">
                  <h6>Course Code</h6>
                </CFormLabel>
                <CFormInput
                  name="name"
                  id="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputAddress">
                  <h6>Course title</h6>
                </CFormLabel>
                <CFormInput
                  name="name"
                  id="courseTitle"
                  value={formData.courseTitle}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText">
                  <h6>Course Outline</h6>
                </CFormLabel>
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
                <CFormLabel htmlFor="inputName">
                  <h6>Course Type</h6>
                </CFormLabel>
                <CFormInput
                  name="name"
                  id="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText">
                  <h6>Program</h6>
                </CFormLabel>
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
                <CFormLabel htmlFor="inputText">
                  <h6>Reference Books</h6>
                </CFormLabel>
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
                <CFormLabel htmlFor="departmentName">
                  <h6>Department</h6>
                </CFormLabel>
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
                <CFormLabel htmlFor="inputCity">
                  <h6>Credit Hours</h6>
                </CFormLabel>
                <CFormInput
                  name="name"
                  id="creditHours"
                  value={formData.creditHours}
                  onChange={handleChange}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputText">
                  <h6>Pre Req</h6>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="preReq"
                  value={formData.preReq}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <div className="pt-4">
              <h5>CLOs</h5>
            </div>
            {/* {cloList.map((clo, index) => (
              <CRow className="p-1" key={index}>
                <CCol>
                  <CFormLabel>
                    <h6>Objective</h6>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    // id={`objective${index}`}
                    id="objective"
                    value={clo.objective}
                    // value={formData.objective}
                    onChange={(e) => {
                      console.log('clo.objective:', clo.objective)
                      console.log('e.target.value:', e.target.value)
                      handleCloChange(index, 'objective', e.target.value)
                    }}
                  />
                </CCol>
                <CCol>
                  {/* <CFormLabel htmlFor={`description${index}`}> */}
            {/* <CFormLabel>
                    <h6>Description</h6>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    // id={`description${index}`}
                    id="description"
                    value={clo.description}
                    onChange={(e) => {
                      console.log('clo.description:', clo.description)
                      console.log('e.target.value:', e.target.value)

                      handleCloChange(index, 'description', e.target.value)
                    }}
                  />
                </CCol>
                <CCol className="d-flex gap-1 align-items-end pb-2">
                  {index !== 0 && (
                    <FaMinusCircle onClick={() => removeClo(index)} size={20} color="b71c1c" />
                  )}
                  <FaPlusCircle onClick={addClo} size={22} color="4a148c" />
                </CCol>
              </CRow>
                  ))} */}
            {cloList.map((clo, index) => (
              <CRow className="p-1" key={index}>
                <CCol>
                  <CFormLabel>
                    <h6>Objective</h6>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="objective"
                    value={cloList[index].objective} // Use the value from state
                    onChange={(e) => {
                      console.log('cloList[index].objective', cloList[index].objective)
                      handleCloChange(index, 'objective', e.target.value)
                    }}
                  />
                </CCol>
                <CCol>
                  <CFormLabel>
                    <h6>Description</h6>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="description"
                    value={cloList[index].description} // Use the value from state
                    onChange={(e) => {
                      console.log('cloList[index].description', cloList[index].description)
                      handleCloChange(index, 'description', e.target.value)
                    }}
                  />
                </CCol>
                <CCol className="d-flex gap-1 align-items-end pb-2">
                  {index !== 0 && (
                    <FaMinusCircle onClick={() => removeClo(index)} size={20} color="b71c1c" />
                  )}
                  <FaPlusCircle onClick={addClo} size={22} color="4a148c" />
                </CCol>
              </CRow>
            ))}

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
            </CRow>
          </DocsExample>
        </div>
      </CForm>
    </div>
  )
}
export default AddCourse
