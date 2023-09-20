import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, flagSet } from '@coreui/icons'
import { registerUser } from 'src/services/loginDetail'
import { getAllDepartments } from 'src/services/departments'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoggedInUser, setToken } from 'src/store/auth/authSlice'
import { X_TOKEN } from 'src/constants/api.constant'

const errorToast = (msg) => (
  <CToast>
    <CToastBody>{msg} </CToastBody>
  </CToast>
)
const Register = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    registrationNo: null,
    program: null,
    session: null,
    departmentName: null,
    departmentId: null,
    designation: null,
    areaOfSpecialization: null,
    joiningDate: new Date(),
    experience: null,
    coursesOffering: null,
    teachingPlan: null,
    address: null,
    city: null,
    password: null,
    confirmPassword: null,
    contactNo: null,
    isActive: null,
    type: null,
  })
  console.log("formData", formData);
  const [showStudentDepartment, setShowStudentDepartment] = useState(false)
  const [showTeacherDepartments, setShowTeacherDepartments] = useState(false)
  const [departments, setDepartments] = useState([])
  const [validated, setValidated] = useState(false)
  const [departmentOption, setDepartmentOption] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast>
      <CToastBody>Successfully Registered </CToastBody>
    </CToast>
  )
  useEffect(() => {
    getDeptData()
  }, [])
  const getDeptData = async () => {
    try {
      const response = await getAllDepartments()
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

  const handleConfirmPasswordChange = (event) => {
    const { name, value } = event.target
    if (name === 'type') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
      setConfirmPassword(value === '')
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }
  const handlePasswordChange = (event) => {
    const { name, value } = event.target

    if (name === 'type') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
      setPassword(value === '')
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
    } else {
      const response = await registerUser(formData)
      if (response.status >= 400 || response.statusCode >= 400) {
        addToast(errorToast(response?.message))
        setLoading(false)
        return
      }
      addToast(exampleToast)
      dispatch(setToken(response.token))
      dispatch(setLoggedInUser(response.user))
      localStorage.setItem(X_TOKEN, response.token)
      navigate('/dashboard')
    }
    setLoading(false)
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'type') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        departmentId: null,
        departmentName: null,
        addDepartment: null,
      }))
      setShowStudentDepartment(value === 'student')
      setShowTeacherDepartments(value === 'teacher')
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }
  const handleRadioChange = (event) => {
    const { id } = event.target
    setDepartmentOption(id)

    if (id === 'addDepartment') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departmentId: null,
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        departmentName: null,
      }))
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <h1>Register</h1>
              <p className="text-medium-emphasis">Create your account</p>
              <CRow>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="name"
                      valid
                      required
                      placeholder="Username"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                </CCol>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      required
                      placeholder="Email"
                      valid
                      onChange={handleChange}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CInputGroup className="my-2 pr-0">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      name="type"
                      id="validationServer04"
                      onChange={handleChange}
                      required
                      valid
                      aria-label="Default select example"
                      options={[
                        'Select Type',
                        { label: 'Student', value: 'student' },
                        { label: 'Teacher', value: 'teacher' },
                      ]}
                    />
                  </CInputGroup>
                </CCol>
                <CCol>
                  {showTeacherDepartments && (
                    <>
                      <CFormCheck
                        type="radio"
                        name="selectType"
                        id="selectDepartment"
                        label="Select Department"
                        onChange={handleRadioChange}
                        checked={departmentOption === 'selectDepartment'}
                      />
                      <CFormCheck
                        type="radio"
                        name="selectType"
                        id="addDepartment"
                        label="Add Department"
                        onChange={handleRadioChange}
                        checked={departmentOption === 'addDepartment'}
                      />
                    </>
                  )}
                </CCol>
              </CRow>

              {showStudentDepartment && (
                <>
                  <CRow>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormSelect
                          name="departmentId"
                          onChange={handleChange}
                          aria-label="Default select example"
                          options={departments}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="registrationNo"
                          valid
                          required
                          placeholder="Registration Number"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="program"
                          valid
                          required
                          placeholder="Program"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="session"
                          valid
                          required
                          placeholder="Session"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                </>
              )}

              {showTeacherDepartments && (
                <>
                  <CRow>
                    <CCol>
                      {departmentOption === 'selectDepartment' && (
                        <CInputGroup className="my-2">
                          <CInputGroupText></CInputGroupText>
                          <CFormSelect
                            name="departmentId"
                            onChange={handleChange}
                            aria-label="Default select example"
                            options={departments}
                          />
                        </CInputGroup>
                      )}

                      {departmentOption === 'addDepartment' && (
                        <CInputGroup className="my-2">
                          <CInputGroupText></CInputGroupText>
                          <CFormInput
                            name="departmentName"
                            placeholder="Add Department"
                            onChange={handleChange}
                          />
                        </CInputGroup>
                      )}
                    </CCol>
                    <CCol></CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="designation"
                          valid
                          required
                          placeholder="Designation"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="areaOfSpecialization"
                          valid
                          required
                          placeholder="Area of Specialization"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="date"
                          name="joiningDate"
                          placeholder="Joining Data"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="experience"
                          placeholder="Experience"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="teachingPlan"
                          placeholder="Teaching Plan"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="my-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          name="coursesOffering"
                          placeholder="Courses Offering"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                </>
              )}

              <CRow>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handlePasswordChange}
                      required
                      valid
                    />
                  </CInputGroup>
                </CCol>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      onChange={handleConfirmPasswordChange}
                      required
                      valid
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>

                    <CFormInput
                      name="contactNo"
                      type="contactNo"
                      placeholder="Contact Number"
                      id="contactNo"
                      onChange={handleChange}
                      required
                      valid
                    />
                  </CInputGroup>
                </CCol>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                       name="address"
                      type="text"
                      id="address"
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <CInputGroup className="my-2">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    name = "city"
                    id="city" 
                    placeholder="City " 
                    onChange={handleChange}
                    
                     />
                  </CInputGroup>
                </CCol>
                <CCol></CCol>
              </CRow>
              {/* <CInputGroup className="my-2">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>

                <CFormInput
                  name='status'
                  type="status"
                  placeholder="Status"
                  id="status"
                  onChange={handleChange}
                  required
                  valid
                />
              </CInputGroup> */}

              <div>
                <CButton className="justify-content-end" type="submit" color="primary">
                  {loading ? (
                    <>
                      <CSpinner component="span" size="sm" aria-hidden="true" className="mr-1" />{' '}
                      Creating
                    </>
                  ) : (
                    'Create Account'
                  )}
                </CButton>
                <CToaster ref={toaster} push={toast} placement="top-end" />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  )
}

export default Register
