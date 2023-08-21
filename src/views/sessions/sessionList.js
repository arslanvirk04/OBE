import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';
import { deleteProgram } from 'src/services/programs';
import { deleteSession } from 'src/services/sessions';


const SessionList = ({ sessionData = [], GetSessionData }) => {
  const navigate = useNavigate();

  const destroySession = async (id) => {
    const response = await deleteSession(id)
    console.log("program deleted", response);
    window.alert("student deleted successfully")
    GetSessionData()
    // addToast(errorToast(response?.message))
  }
  const updateSession = async (id) => {
    navigate(`/sessions/${id}/edit`)
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
              <CIcon icon={cilPencil} size="l" onClick={() => updateSession(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroySession(row.id)} />
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
    <Table columns={cols} data={sessionData} />
  )
}
export default SessionList;
