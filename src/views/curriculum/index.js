import { CButton, CCard, CCardBody } from '@coreui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCurriculums } from 'src/services/curriculum'
import CurriculumList from './CuurriculumList'
import { useState } from 'react'
import { useEffect } from 'react'

const Curriculum = () => {
  const navigate = useNavigate()
  const [curriculumData, setCurriculumData] = useState([])

  useEffect(() => {
    GetCurriculumData()
  }, [])
  const GetCurriculumData = async () => {
    const res = await getAllCurriculums()
    console.log('curriculumData', res)
    const data = res.rows.map((row) => ({
      ...row,
    }))
    setCurriculumData(data)
  }
  const navigateToAddCurriculum = () => {
    navigate('/curriculum/add')
  }
 
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Curriculum Data</h5>
        <div>
          <CButton onClick={navigateToAddCurriculum}>Add Curriculum</CButton>
        </div>
      </div>
      <CCardBody className="d-flex justify-content-between">
        <CurriculumList curriculumData={curriculumData} GetCurriculumData={GetCurriculumData} />
      </CCardBody>
     
    </CCard>
  )
}

export default Curriculum
