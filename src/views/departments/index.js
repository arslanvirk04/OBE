import { CButton, CCard, CCardBody } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDepartments } from 'src/services/departments'
import DepartmentList from './departmentList'

const Departments = () => {
  const navigate = useNavigate()
const [departmentData, setDepartmentData] = useState([])
  useEffect(() => {
    GetDepartmentData()
  }, [])

  const GetDepartmentData = async () => {
    const response = await getAllDepartments()
    // console.log('GetDepartmentData', response)
    const data = response?.departments.rows.map((row) => ({
      ...row,
    //   departmentName: row.Department?.name,
    
    }))
    console.log("data",data);
    setDepartmentData(data)
  }

  const navigateToAddDepartment = () => {
    navigate('/departments/add')
  }

  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Department Data</h5>
        <CButton onClick={navigateToAddDepartment}>Add Department</CButton>
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between">
            <DepartmentList departmentData={departmentData}
            GetDepartmentData={GetDepartmentData} />
        </CCardBody>
      </div>
    </CCard>
  )
}

export default Departments
