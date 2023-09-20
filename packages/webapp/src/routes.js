import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const AddStudent = React.lazy(() => import('./views/student/AddStudent'))
const Student = React.lazy(() => import('./views/student/index'))

const Teacher = React.lazy(() => import('./views/teacher/index'))
const AddTeacher = React.lazy(() => import('./views/teacher/addTeacher'))

const AddCourse = React.lazy(() => import('./views/courses/AddCourse'))
const Courses = React.lazy(() => import('./views/courses/index'))

const AddCurriculum = React.lazy(() => import('./views/curriculum/AddCurriculum'))

const Curriculum = React.lazy(() => import('./views/curriculum/index'))


const Import = React.lazy(() => import('./views/import/Import'))
const Export = React.lazy(() => import('./views/export/Export'))
const Programs = React.lazy(() => import('./views/programs/index'))
const AddProgram = React.lazy(() => import('./views/programs/AddProgram'))
const Session = React.lazy(() => import('./views/sessions/index'))
const AddSession = React.lazy(() => import('./views/sessions/AddSession'))
const Departments = React.lazy(() => import('./views/departments/index'))
const AddDepartment = React.lazy(() => import('./views/departments/AddDepartment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/student', name: 'Student', element: Student, exact: true },
  { path: '/student/add', name: 'AddStudent', element: AddStudent, exact: true },
  { path: '/student/:studentId/edit', name: 'EditStudent', element: AddStudent, exact: true },

  { path: '/faculty', name: 'Faculty', element: Teacher, exact: true },
  { path: '/teacher/add', name: 'AddTeacher', element: AddTeacher, exact: true },
  { path: '/teacher/:teacherId/edit', name: 'EditTeacher', element: AddTeacher, exact: true },

  { path: '/courses', name: 'Courses', element: Courses, exact: true },
  { path: '/courses/add', name: 'AddCourse', element: AddCourse, exact: true },
  { path: '/courses/:courseId/edit', name: 'EditCourse', element: AddCourse, exact: true },
  { path: '/curriculum', name: 'Curriculum', element: Curriculum , exact: true},
  { path: '/curriculum/add', name: 'AddCurriculum', element: AddCurriculum, exact: true },
  {
    path: '/curriculum/:curriculumId/edit',
    name: 'EditCurriculum',
    element: AddCurriculum,
    exact: true
  },
  { path: '/import', name: 'Import', element: Import, exact: true },
  { path: '/export', name: 'Export', element: Export, exact: true },

  { path: '/programs', name: 'Programs', element: Programs, exact: true },
  { path: '/programs/add', name: 'AddProgram', element: AddProgram, exact: true },
  { path: '/programs/:programId/edit', name: 'EditProgram', element: AddProgram, exact: true },

  { path: '/sessions', name: 'Session', element: Session, exact: true },
  { path: '/sessions/add', name: 'AddSession', element: AddSession, exact: true },
  { path: '/sessions/:sessionId/edit', name: 'EditSession', element: AddSession, exact: true },

  { path: '/departments', name: 'Programs', element: Departments, exact: true },
  { path: '/departments/add', name: 'AddDepartment', element: AddDepartment, exact: true },
  {
    path: '/departments/:departmentId/edit',
    name: 'EditDepartment',
    element: AddDepartment,
    exact: true,
  },
]

export default routes
