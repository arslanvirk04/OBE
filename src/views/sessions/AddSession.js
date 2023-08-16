import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CRow,
    CToast,
    CToastBody,
    CToaster,
  } from '@coreui/react'
  import React, { useEffect, useRef, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import { ToastContainer, toast } from 'react-toastify'
  import { DocsExample } from 'src/components'
  import 'react-toastify/dist/ReactToastify.css'
import { addSession, getOneSession } from 'src/services/sessions'
  
  const AddSession = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      name: null,
    })
    useEffect(() => {
      if (params.sessionId) {
        getSessionDetails(params.sessionId)
      }
    }, [params.sessionId])
  
    const getSessionDetails = async (sessionId) => {
      try {
        const res = await getOneSession(sessionId)
        console.log('res', res)
        setFormData({
          id: res.id,
          name: res.name || '',
        })
      } catch (err) {}
    }
    const handleSubmit = async (event) => {
      event.preventDefault()
  
      const response = await addSession(formData)
      console.log(' program response ', response)
      // addToast(exampleToast)
      toast('Successfully Registered')
  
      navigate('/sessions')
    }
  
    const handleChange = (event) => {
      const { id, value } = event.target
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }))
    }
    const navigateToSession = () => {
      navigate(-1)
    }
  
    return (
      <DocsExample href="forms/layout#gutters">
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol>
              <CFormLabel htmlFor="name">Session Name</CFormLabel>
              <CFormInput
                type="Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol></CCol>
            <CCol></CCol>
          </CRow>
          <CRow>
            <CCol>
              <div className="d-flex  gap-2 justify-content-end pt-3">
                <div xs="auto">
                  <CButton onClick={navigateToSession}>Cancel</CButton>
                </div>
                <div xs="auto">
                  <CButton type="submit">Submit</CButton>
                </div>
              </div>
            </CCol>
            <CCol></CCol>
            <CCol></CCol>
          </CRow>
        </CForm>
      </DocsExample>
    )
  }
  
  export default AddSession
  