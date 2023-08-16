import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent, getOneStudent, updateStudentData } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteTeacher } from 'src/services/faculty';


// const [toast, setToast] = useState(0)
// const toaster = useRef()

// const errorToast = (msg) => (

//   <CToast>
//     <CToastBody>{msg} </CToastBody>
//   </CToast>
// )



const TeacherList = ({ teacherData = [], GetTeacherData }) => {
  const navigate = useNavigate();
  console.log('teacherData ', teacherData);

  const destroyTeacher= async (id) => {

    const response = await deleteTeacher(id)
    console.log("response", response);

    window.alert("Teacher deleted successfully")
    GetTeacherData()
    // addToast(errorToast(response?.message))
  }
  const updateTeacher = async (id) => {

    navigate(`/teacher/${id}/edit`)
  }

  const tableColumns = [
    {
      Header: "Name",
      accessor: 'User.name',

    },
    {
      Header: "Designation",
      accessor: 'designation',

    },
    {
      Header: "Department",
      accessor: 'Department.name',

    },
    {
      Header: "Email",
      accessor: 'User.email',

    },
    {
      Header: "Experience",
      accessor: 'experience',

    },
    // {
    //   Header: "Joining Date",
    //   accessor: 'joiningDate',

    // },
    {
      Header: "Area of Specialization",
      accessor: 'areaOfSpecialization',

    },
    // {
    //   Header: "Teaching Plan",
    //   accessor: 'teachingPlan',

    // },
    // {
    //   Header: "Session",
    //   accessor: 'session',

    // },

    {
      Header: "Actions",
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original;
      

        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateTeacher(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyTeacher(row.id)} />

              {/* <CToaster ref={toaster} push={toast} placement="top-end" /> */}
            </span>
          </div>
        );
      },

    },

  ]
  const columnHeaders = _.map(tableColumns, 'Header')
  const cols = useMemo(() => tableColumns, columnHeaders)

  return (


    <Table columns={cols} data={teacherData} />


  )
}

export default TeacherList;
