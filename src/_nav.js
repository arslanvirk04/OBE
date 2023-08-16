import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSchool,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Faculty',
    to: '/faculty',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Students',
    to: '/student',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Curriculum',
    to: '/curriculum',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Import',
  //   to: '/import',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Export',
  //   to: '/export',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Programs',
    to: '/programs',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sessions',
    to: '/sessions',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Departments',
    to: '/departments',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },

  // {
  //   component: CNavItem,
  //   name: 'Assessment Methods',
  //   to: '/assessments',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavItem,
  //   name: 'Available Resources',
  //   to: '/availableResources',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  // },
]

export default _nav
