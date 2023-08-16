import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsExample } from 'src/components'
import { getAllDepartments } from 'src/services/departments'
import { addTeacher, getOne } from 'src/services/faculty'

const AddTeacher = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    departmentName: null,
    designation: null,
    areaOfSpecialization: null,
    experience: null,
    teachingPlan: null,
    city: null,
    contactNo: null,
    address: null,
    joiningDate: null,
    departmentId: null,
    userId: null,
    password: null,
    confirmPassword: null,
    createdAt: new Date(),
  })
  useEffect(() => {
    getDeptData(), console.log('params', params)
    if (params.teacherId) {
      setIsEdit(true)
      getTeacherDetails(params.teacherId)
    }
  }, [params.teacherId])

  const getDeptData = async () => {
    try {
      const response = await getAllDepartments()
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

  const getTeacherDetails = async (teacherId) => {
    try {
      const result = await getOne(teacherId)
      console.log('result: ', result)
      setFormData({
        name: result.User?.name || '',
        email: result.User?.email || '',
        departmentName: result.Department?.name || '',
        designation: result.designation || '',
        areaOfSpecialization: result.areaOfSpecialization || '',
        experience: result.experience || '',
        teachingPlan: result.teachingPlan || '',
        coursesOffering: result.coursesOffering || '',
        city: result.User?.city || '',
        address: result.User?.address || ' ',
        contactNo: result.User?.contactNo || '',
        joiningDate: result.joiningDate || '',
        departmentId: result.Department?.id || '',
        userId: result.User?.userId || '',
        password: result.password || '',
        confirmPassword: result.confirmPassword || '',
        createdAt: new Date(result.createdAt) || new Date(),
      })
    } catch (error) {}
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await addTeacher(formData)
    console.log('response: ', response)
    navigate('/faculty')
  }
  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  // Function to navigate to the AddStudent form
  const navigateToTeacher = () => {
    navigate(-1)
  }
  return (
    <DocsExample href="forms/layout#gutters">
      <CForm onSubmit={handleSubmit}>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="inputName"><h6>Name</h6></CFormLabel>
            <CFormInput type="Name" id="name" onChange={handleChange} value={formData.name} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="inputEmail4"><h6>Email</h6></CFormLabel>
            <CFormInput type="text" id="email" onChange={handleChange} value={formData.email} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="departmentName"><h6>Department</h6></CFormLabel>
            <CFormSelect
              type="text"
              id="departmentId"
              aria-label="Default select example"
              onChange={handleChange}
              options={departments}
              value={formData.departmentId}
            />
          </CCol>
        </CRow>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="designation"><h6>Designation</h6></CFormLabel>
            <CFormInput type="text" id="designation" onChange={handleChange} 
            value={formData.designation} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="areaOfSpecialization"><h6>Area of Specialization</h6></CFormLabel>
            <CFormInput type="text" id="areaOfSpecialization"
             value={formData.areaOfSpecialization}
            onChange={handleChange} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="joiningDate"><h6>Joining Date</h6></CFormLabel>
            <CFormInput
             type="date" 
             id="joiningDate" 
             value={formData.joiningDate}
            onChange={handleChange} />
          </CCol>
        </CRow>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="experience"><h6>experience</h6></CFormLabel>
            <CFormInput
             id="experience"
              onChange={handleChange}
              value={formData.experience}
               />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="teachingPlan"><h6>Teaching Plan</h6></CFormLabel>
            <CFormInput 
            id="teachingPlan" 
            onChange={handleChange}
            value={formData.teachingPlan}
             />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="coursesOffering"><h6>Courses Offering</h6></CFormLabel>
            <CFormInput 
            id="coursesOffering" 
            onChange={handleChange}
            value={formData.coursesOffering}
             />
          </CCol>
        </CRow>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="inputAddress"><h6>Address</h6></CFormLabel>
            <CFormInput
             id="address" 
             placeholder="1234 Main St"
             value={formData.address}
             onChange={handleChange} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="InputNumber"><h6>Contact No</h6></CFormLabel>
            <CFormInput
             id="contactNo"
              placeholder="+92" 
              onChange={handleChange} 
              value={formData.contactNo}
              />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="inputCity"><h6>City</h6></CFormLabel>
            <CFormInput
             type="text" 
             id="city" 
             onChange={handleChange}
             value={formData.city}
              />
          </CCol>
        </CRow>

        {!isEdit && (
          <CRow className="row g-5">
            <CCol>
              <CFormLabel htmlFor="password"><h6>Password</h6></CFormLabel>
              <CFormInput id="password" onChange={handleChange} />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="confirmPassword"><h6>Confirm Password</h6></CFormLabel>
              <CFormInput type="confirmPassword" id="confirmPassword" onChange={handleChange} />
            </CCol>
            <CCol></CCol>
          </CRow>
        )}

        <CRow className=" row gx-2 my-3 justify-content-end ">
          <CCol xs="auto" className="">
            <CButton onClick={navigateToTeacher}>Cancel</CButton>
          </CCol>
          <CCol xs="auto" className="">
            <CButton type="submit">Submit </CButton>
          </CCol>
        </CRow>
      </CForm>
    </DocsExample>
  )
}

export default AddTeacher
