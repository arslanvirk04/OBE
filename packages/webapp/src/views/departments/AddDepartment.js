import { CButton, CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsExample } from 'src/components'
import { addDepartment, getOne } from 'src/services/departments'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddDepartment = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [formData, setFormData] = useState({
    name: null,
  })

  useEffect(() => {
    console.log('params', params)
    // Fetch student details and populate the form fields when the component mounts
    if (params.departmentId) {
      getDepartmentDetails(params.departmentId)
    }
  }, [params.departmentId])

  const getDepartmentDetails = async (departmentId) => {
    try {
      const departmentData = await getOne(departmentId)
      console.log('departmentData', departmentData)
      setFormData({
        id: departmentData.id,
        name: departmentData.name || '',
      })
    } catch (err) {}
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await addDepartment(formData)
    console.log('add Dept: ', response)
    navigate('/departments')
  }

  const notify = () => {
    toast.success('Successfully added', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }
  const navigateToDepartments = () => {
    navigate(-1)
  }

  return (
    <DocsExample href="forms/layout#gutters">
      <CForm onSubmit={handleSubmit}>
        <CRow>
          <CCol>
            <CFormLabel htmlFor="name">Department Name</CFormLabel>
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
                <CButton onClick={navigateToDepartments}>Cancel</CButton>
              </div>
              <div xs="auto">
                <CButton type="submit" onClick={notify}>
                  Submit
                </CButton>
              </div>
            </div>
          </CCol>
          <CCol></CCol>
          <CCol></CCol>
        </CRow>
   
      </CForm>
      <ToastContainer />  
    </DocsExample>
  )
}

export default AddDepartment
