import { useMemo } from 'react';
import _ from "lodash";
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { deleteStudent } from 'src/services/student';
import Table from 'src/components/Table';
import { useNavigate } from 'react-router-dom';


const ProfileList = ({ studentData = [], GetStudentData }) => {
  const navigate = useNavigate();

  const updateStudent = async (id) => {
    navigate(`/student/${id}/edit`)
  }
  const tableColumns = [
    {
      Header: "Name",
      accessor: 'User.name',
    },

    {
      Header: "Email",
      accessor: 'email',
    },
    {
      Header: "Contact No",
      accessor: 'contactNo',
    },
    {
      Header: "Address",
      accessor: 'address',
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
export default ProfileList;
