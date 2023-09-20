import { useState } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
} from '@coreui/react'

const ModelCurriculum = ({
  selectedProgram,
  visible,
  setVisible,
  lineId,
  curriculumData,
}) => {
  const matchingCurriculum = curriculumData.find((data) => data.id === lineId)

  console.log('curriculumData', curriculumData)

  console.log('selectedProgram', selectedProgram)
  return (
    <>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        style={{ maxHeight: '550px', width: '700px', overflowY: 'auto' }}
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle> Curriculum Details </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {matchingCurriculum ? (
            <>
              <h5>Year: {matchingCurriculum.year}</h5>
              <h5>Program: {matchingCurriculum.Program?.name}</h5>
              <div className="row">
                {matchingCurriculum.CurriculumSemester?.map((row, index) => (
                  <div className="col-md-6 p-2" key={row.semester}>
                    <CCard className="p-2 h-100">
                      <h6>Semester {row.semester}</h6>
                      {row.CurriculumSemesterCourse?.map((course) => (
                        <li key={course.id}> {course.Course?.courseTitle}</li>
                      ))}
                    </CCard>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No matching curriculum found.</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color=" secondary " onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModelCurriculum
