import React from 'react'
import AddProgram from './AddProgram'
import { ToastContainer } from 'react-toastify';
const toastComponent = () => {
  return (
    <div>
         <>
      <AddProgram />
      <ToastContainer />
    </>

    </div>
  )
}

export default toastComponent




// // ParentComponent.jsx
// import React from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddProgram from './AddProgram'; // Assuming the file path is correct

// const ParentComponent = () => {
//   return (
//     <>
//       <AddProgram />
//       <ToastContainer />
//     </>
//   );
// };

// export default ParentComponent;
