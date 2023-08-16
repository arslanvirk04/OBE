import React, { useMemo } from 'react'
import _ from "lodash";
import Table from 'src/components/Table';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { deleteCurriculum } from 'src/services/curriculum';

const CurriculumList = ({ curriculumData =[], GetCurriculumData  }) => {
  const navigate = useNavigate()


  const destroyCurriculum = async (id) => {
    const response = await deleteCurriculum(id)
    console.log("response", response);
    window.alert("course deleted successfully")
    GetCurriculumData()
    // addToast(errorToast(response?.message))
  }
  console.log("curriculumData", curriculumData);
  const updateCurriculum = async (id) => {
    navigate(`/curriculum/${id}/edit`)
  }
  //tables
  const tableColumns = [
    {
      Header: "Curriculum Year",
      accessor: 'year',
    },
   
    {
      Header: "Program",
      accessor: 'Program.name',
    },
    {
      Header: "Course",
      accessor: 'Course.courseTitle',
    },
   
    {
      Header: "Actions",
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original;
        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateCurriculum(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyCurriculum(row.id)} />

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
      <Table columns={cols} data={curriculumData} />
  )
}
export default CurriculumList;
