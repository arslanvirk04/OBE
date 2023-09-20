import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CToast,
  CToastBody,
  CToaster,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { DocsExample } from 'src/components'
import { addProgram, getOneProgram } from 'src/services/programs'
import 'react-toastify/dist/ReactToastify.css'

const AddProgram = () => {
  const params = useParams()
  const navigate = useNavigate()
  // const [toast, addToast] = useState(0)

  // const toaster = useRef()
  // const exampleToast = (
  //   <CToast>
  //     <CToastBody>Successfully Registered </CToastBody>
  //   </CToast>
  // )
  const [formData, setFormData] = useState({
    name: null,
    semesters: null,
  })
  useEffect(() => {
    if (params.programId) {
      getProgramDetails(params.programId)
    }
  }, [params.programId])

  const getProgramDetails = async (programId) => {
    try {
      const res = await getOneProgram(programId)
      console.log('res', res)
      setFormData({
        id: res.id,
        name: res.name || '',
        semesters: res.semesters,
      })
    } catch (err) {}
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await addProgram(formData)
    console.log(' program response ', response)
    // addToast(exampleToast)
    toast('Successfully Registered')

    navigate('/programs')
  }

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }
  const navigateToPrograms = () => {
    navigate(-1)
  }

  const semesters = []
  for (let sem = 1; sem <= 8; sem++) {
    semesters.push(
      <option key={sem} value={sem}>
        {sem}
      </option>,
    )
  }

  return (
    <DocsExample href="forms/layout#gutters">
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="name">Program Name</CFormLabel>
            <CFormInput
              type="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="semesters">Semesters</CFormLabel>
            <CFormSelect
              type="semesters"
              id="semesters"
              value={formData.semesters}
              onChange={handleChange}
            >
              <option value="">No of Semesters</option>
              {semesters}
              required
            </CFormSelect>
          </CCol>
          <CCol></CCol>
        </CRow>
        <CRow>
          <CCol></CCol>
          <CCol>
            <div className="d-flex  gap-2 justify-content-end pt-3">
              <div xs="auto">
                <CButton onClick={navigateToPrograms}>Cancel</CButton>
              </div>
              <div xs="auto">
                <CButton type="submit">Submit</CButton>
              </div>
            </div>
          </CCol>
          <CCol></CCol>
        </CRow>
      </CForm>
    </DocsExample>
  )
}

export default AddProgram
