import {
    CButton,
    CCard,
    CCardBody
} from '@coreui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from 'src/services/faculty';
import TeacherList from './TeacherList';
;
const Teacher = () => {
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState([])

    useEffect(() => {
        GetTeacherData()
    }, [])

    const GetTeacherData = async () => {
        const response = await getAllTeachers();
        console.log("GetTeacherData", response);
        const data = response?.rows.map(row => ({
            ...row,
            // teacherName: row.User.name,
            // departmentName: row.Department.name,

        }))
        setTeacherData(data);
    }
    // Function to navigate to the AddStudent form
    const navigateToTeacher = () => {
        navigate('/teacher/add');

    }

    return (
        <CCard>
            <div className="d-flex justify-content-between align-items-center p-3 pb-0">
                <h5 className="m-0">Teacher Data</h5>
                <CButton onClick={navigateToTeacher}>Add Teacher</CButton>
            </div>
            <CCardBody className="d-flex justify-content-between">
                <TeacherList teacherData={teacherData} GetTeacherData={GetTeacherData} />
            </CCardBody>
        </CCard>
    )
}

export default Teacher
