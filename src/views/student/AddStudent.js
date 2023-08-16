import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsExample } from 'src/components'
import { getAllDepartments } from 'src/services/departments'
import { addStudent, getOneStudent } from 'src/services/student'

const AddStudent = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    email: null,
    registrationNo: null,
    departmentName: null,
    program: null,
    session: null,
    city: null,
    contactNo: null,
    address: null,
    password: null,
    confirmPassword: null,
    departmentId: null,
    userId: null,
    createdAt: new Date(),
  })
  useEffect(() => {
    getDeptData()
    console.log('params', params)
    // Fetch student details and populate the form fields when the component mounts
    if (params.studentId) {
      setIsEdit(true)
      getStudentDetails(params.studentId)
    }
  }, [params.studentId]) // Adding 'id' as a dependency to fetch student details when id changes

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
  console.log('formData', formData)
  // Function to fetch student details based on the provided id
  const getStudentDetails = async (studentId) => {
    try {
      const studentData = await getOneStudent(studentId)
      console.log('studentData', studentData)
      setFormData({
        id: studentData.id,
        name: studentData.User?.name || '',
        email: studentData.User?.email || '',
        registrationNo: studentData.registrationNo || '',
        departmentName: studentData.Department?.name || '',
        program: studentData.program || '',
        session: studentData.session || '',
        city: studentData.User?.city || '',
        contactNo: studentData.User.contactNo || '',
        address: studentData.User.address || '',
        password: studentData.password || '',
        confirmPassword: studentData.confirmPassword || '',
        departmentId: studentData.Department?.id || '',
        userId: studentData.User?.id || '',
        createdAt: new Date(studentData.createdAt) || new Date(),
      })
    } catch (error) {}
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    const currentDate = new Date(); // Get the current date and time
    const updatedFormData = {
      ...formData,
      createdAt: currentDate, // Add the createdAt property with the current date and time
    };
    const response = await addStudent (updatedFormData)
    console.log('response: ', response)
    navigate('/student')
  }
  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }
  const navigateToStudent = () => {
    navigate(-1)
  }
  return (
    <DocsExample href="forms/layout#gutters">
      <CForm onSubmit={handleSubmit}>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="name"><h6>Name</h6></CFormLabel>
            <CFormInput
             type="Name"
              id="name" 
              value={formData.name}
               onChange={handleChange}
               required
               />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="email4"><h6>Email</h6></CFormLabel>
            <CFormInput
             type="email"
              id="email"
               value={formData.email} 
               onChange={handleChange}
               required
                />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="inputRoll-no"><h6>Registration No</h6></CFormLabel>
            <CFormInput
              type="text"
              id="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
          </CCol>
        </CRow>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="inputProgram"><h6>Program</h6></CFormLabel>
            <CFormInput
             type="text" 
             id="program" 
             value={formData.program}
             onChange={handleChange}
             required
              />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="inputProgram"><h6>Session</h6></CFormLabel>
            <CFormInput 
            type="text" 
            id="session" 
            value={formData.session}
             onChange={handleChange} 
             required
             />
          </CCol>
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
        </CRow>
        <CRow className="row g-5">
          <CCol>
            <CFormLabel htmlFor="contactNo"><h6>Contact No</h6></CFormLabel>
            <CFormInput
              id="contactNo"
              placeholder="+92"
              value={formData.contactNo}
              onChange={handleChange}
            />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="city"><h6>City</h6></CFormLabel>
            <CFormInput type="text" value={formData.city} id="city" onChange={handleChange} />
          </CCol>
          <CCol>
            <CFormLabel htmlFor="address"><h6>Address</h6></CFormLabel>
            <CFormInput
              id="address"
              placeholder="1234 Main St"
              value={formData.address}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
        {!isEdit && (
          <CRow className="row g-5">
            <CCol>
              <CFormLabel htmlFor="password"><h6>Password</h6></CFormLabel>
              <CFormInput
                name="password"
                type="password"
                // placeholder="Password"
                id="password"
                onChange={handleChange}
                required
                // valid
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="confirmPassword"><h6>Confirm Password</h6></CFormLabel>
              <CFormInput
                name="confirmPassword"
                type="password"
                // placeholder="confirm Password"
                id="confirmPassword"
                onChange={handleChange}
                required
                // valid
              />
            </CCol>
            <CCol></CCol>
          </CRow>
        )}
        <CRow className=" row gx-2 my-3 justify-content-end">
          <CCol xs="auto" className="">
            <CButton onClick={navigateToStudent}>Cancel</CButton>
          </CCol>
          <CCol xs="auto" className="">
            <CButton type="submit">Submit </CButton>
          </CCol>
        </CRow>
      </CForm>
    </DocsExample>
  )
}

export default AddStudent
