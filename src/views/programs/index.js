import { CButton, CCard, CCardBody } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgramList from './programList'
import { getAllPrograms } from 'src/services/programs'

const Program = () => {
const navigate = useNavigate() 
const [programData ,setProgramData] = useState([])

useEffect(()=>{

  GetProgramData()
}, [])

const GetProgramData =async() =>{
  const response =  await  getAllPrograms()

 const data = response?.rows.map(row =>({
  ...row
 }))
 setProgramData(data)
}


  const navigateToAddProgram = () => {
    navigate ('/programs/add')
  }
  return (
    <CCard>
    <div className="d-flex justify-content-between align-items-center p-3 pb-0">
      <h5 className="m-0" >Program Data</h5>
      <CButton  onClick={navigateToAddProgram}>Add Program</CButton>
    </div>
    <div>
      <CCardBody className="d-flex justify-content-between">
        <ProgramList  programData={programData} GetProgramData={GetProgramData}  />
      </CCardBody>
    </div>
  </CCard>
  )
}

export default Program
