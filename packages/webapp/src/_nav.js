import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilList,
  cilLockLocked,
  cilMenu,
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
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOutUser } from './services/loginDetail'
import { X_TOKEN } from './constants/api.constant'



//const navigate = useNavigate();
//const dispatch = useDispatch();

const handleLogOut = async () => {
  //const response = await logOutUser({ token });
  //dispatch(logout());
  localStorage.removeItem(X_TOKEN);
  //navigate('/login');
};


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
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Curriculum',
    to: '/curriculum',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Programs',
    to: '/programs',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Sessions',
    to: '/sessions',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Departments',
    to: '/departments',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout', // Replace with the appropriate logout route
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
    onClick: handleLogOut, // Assign the logout function to onClick
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
