import {
  CButton,
  CCard,
  CCardBody
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { getAllStudents } from 'src/services/student';
import StudentList from './studentList';
import { useNavigate } from 'react-router-dom';
;
const Student = () => { 
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([])

  useEffect(() => {
    GetStudentData()
  }, [])

  const GetStudentData = async () => {
    const response = await getAllStudents();
    console.log("GetStudentData", response);
    const data = response?.rows.map(row => ({
      ...row,
      // studentName: row.User.name,
      // departmentName: row.Department.name,

    }))
    setStudentData(data);
  }
   const navigateToStudent=()=>{
   navigate('/student/add');
 
   }
 
  return (
    <CCard>
      <div className="d-flex justify-content-between align-items-center p-3 pb-0">
        <h5 className="m-0">Student Data</h5>
        <CButton onClick={navigateToStudent}>Add Student</CButton>
      </div>
      <CCardBody className="d-flex justify-content-between">
       <StudentList studentData={studentData} GetStudentData={GetStudentData} />
      </CCardBody>
    </CCard>
  )
}

export default Student
