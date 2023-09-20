import * as yup from 'yup'

const useValidationSchema = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Username is required')
      .matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters and spaces allowed'),

    email: yup.string().required('Email is required').email('Invalid email format'),
    contactNo: yup
      .string()
      .required('Contact Number is required')
      .matches(/^[0-9]+$/, 'Only numeric characters allowed'),
    registrationNo: yup
      .string()
      .required('Registration Number is required')
      .matches(/^[0-9]+$/, 'Only numeric characters allowed'),
    city: yup
      .string()
      .required('city is required')
      .matches(/^[A-Za-z\s]+$/, 'Only alphabetic characters and spaces allowed'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
      ),
  })

  return validationSchema
}

export default useValidationSchema
