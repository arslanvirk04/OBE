import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { logInUser } from 'src/services/loginDetail'
import { useSelector , useDispatch} from 'react-redux'
import { setLoggedInUser, setToken } from 'src/store/auth/authSlice'
import { X_TOKEN } from 'src/constants/api.constant'


const errorToast = (msg) => (

  <CToast>
    <CToastBody>{msg} </CToastBody>
  </CToast>
)
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const navigate = useNavigate()
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const exampleToast = (
    <CToast>
      <CToastBody>Successfully Logged in user </CToastBody>
    </CToast>
  )


  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }
    ))

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    const response = await logInUser(formData);
 

    dispatch(setToken(response.token));
    dispatch(setLoggedInUser(response.user));
    localStorage.setItem(X_TOKEN,response.token)

    if (response.status >= 400 || response.statusCode >= 400) {
      addToast(errorToast(response?.message))
      return
    }

    addToast(exampleToast)
    navigate('/dashboard')
   
  }
  //query login
  const { email, password } = formData;

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className=" p-4" >
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3 ml-4 mr-4 ">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name='email'
                        type='email'
                        value={email}
                        placeholder="email"
                        required
                        onChange={handleChange} 
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type='password'
                        value={password}
                        placeholder="Password"
                        required
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CToaster ref={toaster} push={toast} placement="top-end" />
                        <CButton type="submit" color="primary" className="px-4" >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      welcome to QAU
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Login;
