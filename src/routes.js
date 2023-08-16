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

// const AddProgram = React.lazy(() => import('./views/programs/AddProgram'))

// const Assessment = React.lazy(() => import('./views/assessments/Assessment'))
// const AvailableResources = React.lazy(() => import('./views/availableResources/AvailableResources'))

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

  // { path: '/assessments', name: 'Assessment', element: Assessment },

  // { path: '/availableResources', name: 'AvailableResources', element: AvailableResources },

  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },
  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
