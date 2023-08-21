import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { getStats } from 'src/services/dashboard'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const dashboard = await getStats()
      setDashboardData(dashboard)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <CRow className="justify-content-between">
      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Teacher Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.teacherCount !== undefined ? (
              <h5>{dashboardData.teacherCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Student Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.studentCount !== undefined ? (
              <h5>{dashboardData.studentCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Course Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.coursesCount !== undefined ? (
              <h5>{dashboardData.coursesCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Curriculum Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.curriculumCount !== undefined ? (
              <h5>{dashboardData.curriculumCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Program Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.programCount !== undefined ? (
              <h5>{dashboardData.programCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard>
          <CCardHeader>
            <h5>Session Count</h5>
          </CCardHeader>
          <CCardBody>
            {dashboardData && dashboardData.sessionsCount !== undefined ? (
              <h5>{dashboardData.sessionsCount}</h5>
            ) : (
              <p>Loading...</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard
