import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import { cilJustifyRight } from '@coreui/icons';



const AvailableResources = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {!showForm ? (
        <div>
          <h3>No records</h3>
          <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
            <button onClick={toggleForm}>Add Available Resources </button></div>
        </div>
      ) : (
        <div>
          <button onClick={toggleForm}>Go Back</button>
          <div className="form-container">

            <form>
              {

<div>
<DocsExample href="forms/layout#gutters">
       <CForm className="row g-3">

       <CCol md={6}>
           <CFormLabel htmlFor="inputText">Student Count</CFormLabel>
           <CFormInput type="number" id="text" />
         </CCol>

         <CCol md={6}>
           <CFormLabel htmlFor="inputText">Room Capacity</CFormLabel>
           <CFormInput type="number" id="text" />
         </CCol>
        
         <CCol xs={6}>
           <CFormLabel htmlFor="inputText">whiteboard</CFormLabel>
           <CFormInput id="number" placeholder="" />
         </CCol>
         <CCol xs={6}>
           <CFormLabel htmlFor="inputText">projector</CFormLabel>
           <CFormInput id="number" placeholder="" />
         </CCol>
         <CCol md={6}>
           <CFormLabel htmlFor="inputText">labInformation</CFormLabel>
           <CFormInput id="number" />
         </CCol>
        
       
         <CCol xs={12}>
           <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
         </CCol>
         <CCol xs={12}>
           <CButton type="submit">Submit</CButton>
         </CCol>
       </CForm>
     </DocsExample>



</div>
                
              }
            </form>
          </div>
        </div>
      )
      }
    </div>
  );
}
export default AvailableResources