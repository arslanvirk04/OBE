import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';


// const [toast, setToast] = useState(0)
// const toaster = useRef()

// const errorToast = (msg) => (

//   <CToast>
//     <CToastBody>{msg} </CToastBody>
//   </CToast>
// )
const StudentList = ({ studentData = [], GetStudentData }) => {
  const navigate = useNavigate();
  console.log('studentData ', studentData);
  const destroyStudent = async (id) => {
    const response = await deleteStudent(id)
    console.log("response", response);
    window.alert("student deleted successfully")
    GetStudentData()
    // addToast(errorToast(response?.message))
  }
  const updateStudent = async (id) => {
    navigate(`/student/${id}/edit`)
  }
  const tableColumns = [
    {
      Header: "Name",
      accessor: 'User.name',
    },
    {
      Header: "Registration Number",
      accessor: 'registrationNo',
    },
    {
      Header: "Department",
      accessor: 'Department.name',
    },
    {
      Header: "Program",
      accessor: 'program',
    },
    {
      Header: "Session",
      accessor: 'session',
    },
    {
      Header: "Actions",
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateStudent(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyStudent(row.id)} />
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
    <Table columns={cols} data={studentData} />
  )
}
export default StudentList;
