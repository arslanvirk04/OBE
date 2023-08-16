import { CButton, CCard , CCardBody} from '@coreui/react'
import React from 'react'

const Import = () => {
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Import Data</h5>
        <CButton>Import</CButton>
      </div>
      <div>
        <CCardBody className="d-flex justify-content-between"></CCardBody>
      </div>
    </CCard>
  )
}

export default Import
