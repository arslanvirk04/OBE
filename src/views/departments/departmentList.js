import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';
import { deleteDepartment } from 'src/services/departments';


// const [toast, setToast] = useState(0)
// const toaster = useRef()

// const errorToast = (msg) => (

//   <CToast>
//     <CToastBody>{msg} </CToastBody>
//   </CToast>
// )
const DepartmentList = ({ departmentData = [], GetDepartmentData }) => {
  const navigate = useNavigate();

  const destroyDepartment = async (id) => {
    const response = await deleteDepartment(id)
    console.log("response", response);
    window.alert("Department deleted successfully")
    GetDepartmentData()
    // addToast(errorToast(response?.message))
  }
  const updateDepartment = async (id) => {
    navigate(`/departments/${id}/edit`)
  }
  const tableColumns = [
    {
      Header: "Name",
      accessor: 'name',
    },
    
    {
      Header: "Actions",
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateDepartment(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyDepartment(row.id)} />
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
    <Table columns={cols} data={departmentData} />
  )
}
export default DepartmentList;
