import { CButton, CCard, CCardBody } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SessionList from './sessionList'
import { getAllSessions } from 'src/services/sessions'

const Session = () => {
  const navigate = useNavigate()
  const [sessionData, setSessionData] = useState([])

  useEffect(() => {
    GetSessionData()
  }, [])

  const GetSessionData = async () => {
    const response = await getAllSessions()

    const data = response?.rows.map((row) => ({
      ...row,
    }))
    setSessionData(data)
  }

  const navigateToAddSession = () => {
    navigate('/sessions/add')
  }
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Session Data</h5>
        <CButton onClick={navigateToAddSession}>Add Session</CButton>
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between">
          <SessionList sessionData={sessionData} GetSessionData={GetSessionData} />
        </CCardBody>
      </div>
    </CCard>
  )
}

export default Session
