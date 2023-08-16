import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
} from '@coreui/react';
import { getAllCourses } from 'src/services/courses';
import { useNavigate } from 'react-router-dom';
import CourseList from './CourseList';

const Courses = () => {
    const [courseData, setCourseData] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        GetCoursesData()
    }, [])
    const GetCoursesData = async () => {
        const res = await getAllCourses()
        console.log("courseData", res);
        const data = res?.rows.map(row => ({
            ...row,
        }))
        setCourseData(data);
    }
    const navigateToAddCourse = () => {
        navigate('/courses/add')
    }
    return (


        <CCard>
            <div className="d-flex justify-content-between align-items-center p-3 pb-0">
                <h5 className="m-0">Course Data</h5>
                <div>

                <CButton onClick={navigateToAddCourse}>Add Course</CButton>
                </div>
            </div>
            <CCardBody className="d-flex justify-content-between">
                <CourseList courseData={courseData} GetCoursesData={GetCoursesData} />
            </CCardBody>
        </CCard>
    )
}
export default Courses