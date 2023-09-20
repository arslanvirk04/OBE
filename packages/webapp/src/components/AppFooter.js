import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
        QAU
        </a> */}
        <span className="ms-1"> Copyright &copy; 2023 QAU</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by :</span>
        <span>M Arslan & Nida ul Mah</span>
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
