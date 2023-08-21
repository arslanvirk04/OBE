import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from 'src/components/Table'
import CIcon from '@coreui/icons-react'
import { cilFolderOpen, cilMoney, cilPencil, cilSpreadsheet, cilTrash } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { deleteCurriculum } from 'src/services/curriculum'
import ModelCurriculum from './ModelCurriculum'

const CurriculumList = ({ curriculumData = [], GetCurriculumData }) => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [lineId, setlineId] = useState(false)

  const destroyCurriculum = async (id) => {
    const response = await deleteCurriculum(id)
    window.alert('course deleted successfully')
    GetCurriculumData()
  }
  const visibleCurriculum = async (id) => {
    setVisible(true)
    setlineId(id)
  }

  const updateCurriculum = async (id) => {
    navigate(`/curriculum/${id}/edit`)
  }
  //tables
  const tableColumns = [
    {
      Header: 'Program',
      accessor: 'Program.name',
    },
    {
      Header: 'Curriculum Year',
      accessor: 'year',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (props) => {
        const row = props.row.original
        return (
          <div className="flex justify-start text-lg">
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilSpreadsheet} size="l" onClick={() => visibleCurriculum(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-blue-500">
              <CIcon icon={cilPencil} size="l" onClick={() => updateCurriculum(row.id)} />
            </span>
            <span className="cursor-pointer p-2 hover:text-red-500">
              <CIcon icon={cilTrash} size="l" onClick={() => destroyCurriculum(row.id)} />
            </span>
          </div>
        )
      },
    },
  ]
  const columnHeaders = _.map(tableColumns, 'Header')
  const cols = useMemo(() => tableColumns, columnHeaders)
  return (
    <>
      <Table columns={cols} data={curriculumData} />
      <ModelCurriculum
        visible={visible}
        setVisible={setVisible}
        lineId={lineId}
        curriculumData={curriculumData}
      />
    </>
  )
}
export default CurriculumList
