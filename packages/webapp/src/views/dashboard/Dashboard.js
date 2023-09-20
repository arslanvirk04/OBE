import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCol, CRow } from '@coreui/react'
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
    <CRow className='pl-0'>
      <CCol xs="12" md="4">
        <CCard className='my-2 ' color="danger" textColor="white">
          <CCardHeader>
            <h5>Teacher Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.teacherCount !== undefined ? (
                <h6 style={{ margin: '0' }}>{dashboardData.teacherCount}</h6>
              ) : (
                <p style={{ margin: '0' }}>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <div className='pl-0'>
        <CCard className='my-2 pl-0' color="dark" textColor="white">
          <CCardHeader>
            <h5>Student Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.studentCount !== undefined ? (
                <h6>{dashboardData.studentCount}</h6>
              ) : (
                <p>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
        </div>
      </CCol>

      <CCol xs="12" md="4">
        <CCard className='my-2' color="warning" textColor="white">
          <CCardHeader>
            <h5>Course Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.coursesCount !== undefined ? (
                <h6>{dashboardData.coursesCount}</h6>
              ) : (
                <p>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard  color="secondary" textColor="white">
          <CCardHeader>
            <h5>Curriculum Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.curriculumCount !== undefined ? (
                <h6>{dashboardData.curriculumCount}</h6>
              ) : (
                <p>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard color="success" textColor="white">
          <CCardHeader>
            <h5>Program Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.programCount !== undefined ? (
                <h6>{dashboardData.programCount}</h6>
              ) : (
                <p>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="4">
        <CCard color="info" textColor="white">
          <CCardHeader>
            <h5>Session Statistics</h5>
          </CCardHeader>
          <CCardBody>
            <CCardText
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <h6>Total Count</h6>
              {dashboardData && dashboardData.sessionsCount !== undefined ? (
                <h6>{dashboardData.sessionsCount}</h6>
              ) : (
                <p>Loading...</p>
              )}
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Dashboard

//   return (

// <div className="row">
//   {[
//     { color: 'primary', textColor: 'white', header: 'Students Statistics' },
//     { color: 'secondary', textColor: 'white', header: 'Teachers Statistics' },
//     { color: 'success', textColor: 'white', header: 'Courses Statistics' },
//     { color: 'danger', textColor: 'white', header: 'Curriculum Statistics' },
//     { color: 'warning', textColor: 'white', header: 'Department Statistics' },
//     { color: 'info', textColor: 'white', header: 'Program Statistics' },
//     { color: 'dark', textColor: 'white', header: 'Sessions Statistics' },
//   ].map((item, index) => (
//     <div className="col-md-3 mb-3" key={index}>
//       <CCard
//         color={item.color}
//         textColor={item.textColor}
//         style={{ maxWidth: '15rem' }}
//       >
//         <CCardHeader>{item.header}</CCardHeader>
//         <CCardBody>
//           <CCardText>Total Count </CCardText>
//         </CCardBody>
//       </CCard>
//     </div>
//   ))}
// </div>

//   )
