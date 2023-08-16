import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';
import { deleteProgram } from 'src/services/programs';


// const [toast, setToast] = useState(0)
// const toaster = useRef()

// const errorToast = (msg) => (

//   <CToast>
//     <CToastBody>{msg} </CToastBody>
//   </CToast>
// )
const ProgramList = ({ programData = [], GetProgramData }) => {
  const navigate = useNavigate();

  const destroyProgram = async (id) => {
    const response = await deleteProgram(id)
    console.log("program deleted", response);
    window.alert("student deleted successfully")
    GetProgramData()
    // addToast(errorToast(response?.message))
  }
  const updateProgram = async (id) => {
    navigate(`/Programs/${id}/edit`)
  }
  const tableColumns = [
    {
      Header: "Name",
      accessor: 'name',
    },
    {
      Header: "Semesters",
      accessor: 'semesters',
    },
    
    {
      Header: "Actions",
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateProgram(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyProgram(row.id)} />
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
    <Table columns={cols} data={programData} />
  )
}
export default ProgramList;
